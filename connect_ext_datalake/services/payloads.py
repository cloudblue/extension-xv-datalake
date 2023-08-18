# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from datetime import datetime, timedelta, timezone

from connect.client import ConnectClient, R


TCR_UPDATE_TYPE_MAPPING = {
    'setup': 'new',
    'update': 'update',
    'adjustment': 'update',
}


def remove_properties(obj: dict, properties: list):
    for prop in properties:
        if prop in obj.keys():
            obj.pop(prop)


def verify_property(obj: dict, properties: dict[str, str]):
    for prop in properties.keys():
        if prop not in obj.keys():
            obj[prop] = properties[prop]


def populate_dependents(parameters: list):
    dependency_map = {}

    for param in parameters:
        if 'constraints' in param.keys() and 'dependency' in param['constraints'].keys():
            parent_param_id = param['constraints']['dependency']['id']
            dependent_object = param['constraints'].pop('dependency')
            dependent_object['id'] = param['id']
            dependent_object['name'] = param['name']

            if parent_param_id not in dependency_map.keys():
                dependency_map[parent_param_id] = []

            dependency_map[parent_param_id].append(dependent_object)

    if dependency_map:
        for param in parameters:
            if param['id'] in dependency_map.keys():
                param['constraints']['dependents'] = dependency_map[param['id']]


def sanitize_product(product: dict):
    remove_properties(
        product,
        [
            'changes_description',
            'public',
            'events',
            'configurations',
            'usage_rule',
            'stats',
            'extensions',
        ],
    )
    verify_property(
        product,
        {
            'published_at': datetime.now(
                tz=timezone(timedelta(hours=0)),
            ).isoformat(timespec='seconds'),
        },
    )

    return product


def sanitize_parameters(parameters: list):
    populate_dependents(parameters)
    for parameter in parameters:
        remove_properties(
            parameter,
            ['events'],
        )

    return parameters


def prepare_product_data_from_listing_request(
    client: ConnectClient,
    listing_request: dict,
):
    product_id = listing_request['product']['id']

    data = {
        'table_name': 'cmp_connect_product',
        'update_type': listing_request['type'],
        'product': listing_request['product'],
    }

    if listing_request['type'] != 'remove':
        data['product'] = sanitize_product(client.products[product_id].get())
        data['product']['parameters'] = sanitize_parameters(
            list(client.products[product_id].parameters.all()),
        )
    else:
        verify_property(
            listing_request['product'],
            {
                'published_at': datetime.now(
                    tz=timezone(timedelta(hours=0)),
                ).isoformat(timespec='seconds'),
            },
        )

    return data


def prepare_product_data_from_product(
    client: ConnectClient,
    product: dict,
):
    product_id = product['id']

    data = {
        'table_name': 'cmp_connect_product',
        'update_type': 'update',
        'product': sanitize_product(product),
    }

    data['product']['parameters'] = sanitize_parameters(
        list(client.products[product_id].parameters.all()),
    )

    return data


def clear_gdpr_data(tc: dict):
    remove_properties(
        tc['account'],
        ['contact_info'],
    )

    if 'tiers' in tc.keys():
        if 'tier1' in tc['tiers'].keys():
            remove_properties(tc['tiers']['tier1'], ['contact_info'])
        if 'tier2' in tc['tiers'].keys():
            remove_properties(tc['tiers']['tier2'], ['contact_info'])


def fix_param_id_and_name(client: ConnectClient, tc: dict):
    parameter_names = [param['id'] for param in tc['params']]
    parameters = client.products[tc['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    )
    param_name_id_map = {param['name']: param['id'] for param in parameters}
    for param in tc['params']:
        sanitize_tc_param(param)
        param['name'] = param['id']
        if param['id'] in param_name_id_map.keys():
            param['id'] = param_name_id_map[param['id']]


def sanitize_tcr(tcr: dict):
    remove_properties(
        tcr,
        [
            'parent_configuration',
            'events',
            'previous_approved_request',
            'assignee',
        ],
    )


def include_last_tcr_request(client: ConnectClient, tc: dict):
    last_tcr = client('tier').config_requests.filter(
        R().configuration.id.eq(tc['id']),
    ).select(
        '-tiers',
        '-configuration',
    ).order_by('-created').first()

    sanitize_tcr(last_tcr)
    tc['last_request'] = last_tcr


def sanitize_tc(client: ConnectClient, tc: dict):
    remove_properties(
        tc,
        [
            'connection',
            'events',
            'template',
            'open_request',
        ],
    )
    clear_gdpr_data(tc)
    fix_param_id_and_name(client, tc)
    verify_property(
        tc,
        {
            'published_at': datetime.now(
                tz=timezone(timedelta(hours=0)),
            ).isoformat(timespec='seconds'),
        },
    )
    return tc


def sanitize_tc_param(tc_param: dict):
    remove_properties(
        tc_param,
        ['value_error'],
    )
    return tc_param


def prepare_tc_data_from_tcr(client: ConnectClient, tcr: dict):
    tc_id = tcr['configuration']['id']
    tcr_type = tcr['type']

    tc = client('tier').configs[tc_id].get()
    include_last_tcr_request(client, tc)

    return {
        'table_name': 'cmp_connect_tierconfig',
        'update_type': TCR_UPDATE_TYPE_MAPPING[tcr_type],
        'tier_config': sanitize_tc(client, tc),
    }


def prepare_tc_data(client: ConnectClient, tc: dict):
    include_last_tcr_request(client, tc)

    return {
        'table_name': 'cmp_connect_tierconfig',
        'update_type': 'update',
        'tier_config': sanitize_tc(client, tc),
    }
