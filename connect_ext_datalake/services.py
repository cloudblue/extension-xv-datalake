# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from datetime import datetime, timedelta

from connect.client import ConnectClient, R
from connect.eaas.core.inject.models import Context

from connect_ext_datalake.schemas import (
    Product,
    ProductInput,
    Settings,
)
from connect_ext_datalake.client import GooglePubsubClient


def get_pubsub_client(installation):
    client = GooglePubsubClient(
        Settings(
            account_info=installation['settings'].get('account_info', {}),
            product_topic=installation['settings'].get('product_topic', ''),
        ),
    )

    client.validate()

    return client


def remove_properties(dict: dict, properties: list):
    for prop in properties:
        if prop in dict.keys():
            dict.pop(prop)


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

    return product


def sanitize_parameters(parameters: list):
    for parameter in parameters:
        remove_properties(
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


def publish_product(
        client: ConnectClient,
        pubsub_client: GooglePubsubClient,
        product,
        logger,
):
    payload = prepare_product_data_from_product(client, product)
    logger.info(f"Start publishing product {product['id']}. Payload: {payload}")
    pubsub_client.publish(payload)
    logger.info(f"Publish of product {product['id']} is successful. Payload: {payload}")


def list_products(client: ConnectClient):
    connect_products = client.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all()

    return list(map(Product.parse_obj, connect_products))


def create_task_publish_product(
    logger,
    client: ConnectClient,
    context: Context,
    installation: dict,
    products: list[ProductInput] | None = None,
):
    payload = {
        'method': 'publish_products',
        'name': f'Publish Products - {context.account_id}',
        'description': 'Publish products to Xvantage Goggle PubSub Topic. Products - All',
        'parameter': {
            'installation': installation,
            'products': [product.dict() for product in products] if products else None,
        },
        'trigger': {
            'type': 'onetime',
            'date': (datetime.utcnow() + timedelta(0, 70)).isoformat(),
        },
    }

    if products:
        products_ids = ','.join([product.id for product in products])
        description = f'Publish {products_ids} products to Xvantage Goggle PubSub Topic.'
        payload['description'] = description

    logger.info(f'Creating dynamic one time schedule method with payload: {payload}')

    client('devops').services[context.extension_id].environments[
        context.environment_id].schedules.create(payload=payload)
