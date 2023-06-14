# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
def remove_prorperties(dict: dict, properties: list):
    for property in properties:
        if property in dict.keys():
            dict.pop(property)


def sanitize_product(product: dict):
    remove_prorperties(
        product,
        [
            'customer_ui_settings',
            'changes_description',
            'public',
            'events',
        ],
    )

    return product

def sanitize_parameters(parameters: list):
    for parameter in parameters:
        remove_prorperties(
            parameter,
            ['events'],
        )
    
    return parameters


def prepare_product_data_from_listing_request(client, listing_request):
    product_id = listing_request['product']['id']

    data = {
        'update_type': listing_request['type'],
        'product': listing_request['product'],
    }

    if listing_request['type'] != 'remove':
        data['product'] = sanitize_product(client.products[product_id].get())
        data['product']['parameters'] = sanitize_parameters(
            list(client.products[product_id].parameters.all()),
        )

    return data


def prepare_product_data_from_product(client, product):
    product_id = product['id']

    data = {
        'update_type': 'update',
        'product': sanitize_product(product),
    }

    data['product']['parameters'] = sanitize_parameters(
        list(client.products[product_id].parameters.all()),
    )

    return data
