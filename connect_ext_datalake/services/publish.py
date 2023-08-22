# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.client import ConnectClient, R
from connect.client.exceptions import ClientError
from google.api_core.exceptions import GoogleAPIError

from connect_ext_datalake.schemas import (
    Product,
    Setting,
)
from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.services.payloads import (
    prepare_product_data_from_product,
    prepare_tc_data,
    prepare_tc_data_from_tcr,
)


def get_pubsub_client(setting):
    client = GooglePubsubClient(
        Setting(
            account_info=setting.get('account_info', {}),
            product_topic=setting.get('product_topic', ''),
        ),
    )

    client.validate()

    return client


def publish_tc_from_tcr(
    client: ConnectClient,
    pubsub_client: GooglePubsubClient,
    tcr,
    logger,
):
    payload = prepare_tc_data_from_tcr(client, tcr)
    logger.info(f"Start publishing Tier Config {tcr['configuration']['id']}. Payload: {payload}")
    pubsub_client.publish(payload)
    logger.info(f"Publish of Tier Config {tcr['configuration']['id']}"
                f' is successful.')


def publish_tc(
    client: ConnectClient,
    pubsub_client: GooglePubsubClient,
    tc,
    logger,
):
    logger.info(f"Start publishing Tier Config {tc['id']}.")
    payload = prepare_tc_data(client, tc)
    if not payload:
        logger.info(f"Spiking Tier Config {tc['id']} as the setup request is not approved yet.")
    else:
        logger.info(f"Start publishing Tier Config {tc['id']}. Payload: {payload}")
        pubsub_client.publish(payload)
        logger.info(f"Publish of Tier Config {tc['id']} is successful. Payload: {payload}")


def list_products(client: ConnectClient):
    connect_products = client.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all()

    return list(map(Product.parse_obj, connect_products))


def publish_product_list(products, product_settings_map, client, logger):
    for product in products:
        payload = prepare_product_data_from_product(client, product)
        settings = product_settings_map.get(product['id'], [])
        if settings:
            for setting in settings:
                try:
                    pubsub_client = GooglePubsubClient(setting)
                    logger.info(f"Start publishing product {product['id']} "
                                f"for Hub {setting.hub.id}. Payload: {payload}")
                    pubsub_client.publish(payload)
                    logger.info(f"Product {product['id']} is published for Hub {setting.hub.id}.")
                except (ClientError, GoogleAPIError):
                    logger.exception(
                        f"Problem in while publishing Product {product['id']} "
                        f'and hub {setting.hub.id}.')
        else:
            logger.info(f"No settings found for Product {product['id']}")


def publish_payload(object_type, object_id, payload, settings, logger):
    logger.info(f'Start publish data for {object_type} '
                f'{object_id} with payload {payload}')
    if settings:
        for setting in settings:
            try:
                pubsub_client = GooglePubsubClient(setting)
                pubsub_client.publish(payload)
                logger.info(
                    f'Publish of {object_type} {object_id}'
                    f'is successful for hub {setting.hub.id}',
                )
            except (ClientError, GoogleAPIError):
                logger.exception(f'Problem in while publishing payload {payload} '
                                 f'for hub {setting.hub.id}')
