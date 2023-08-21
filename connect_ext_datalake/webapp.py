# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from logging import LoggerAdapter

from connect.client import ConnectClient
from connect.client.exceptions import ClientError
from connect.eaas.core.decorators import (
    account_settings_page,
    router,
    web_app,
)
from connect.eaas.core.extension import WebApplicationBase
from connect.eaas.core.inject.common import get_call_context, get_logger
from connect.eaas.core.inject.models import Context
from connect.eaas.core.inject.synchronous import (
    get_extension_client,
    get_installation,
    get_installation_client,
)
from fastapi import Depends
from fastapi.responses import HTMLResponse, JSONResponse

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.schemas import Product, ProductInput, Setting, SettingInput
from connect_ext_datalake.services.publish import (
    list_products,
    publish_tc,
)
from connect_ext_datalake.services.tasks import (
    create_task_publish_product,
    create_task_publish_tc,
)
from connect_ext_datalake.services.settings import (
    get_all_settings,
    get_settings,
    update_settings,
)


@web_app(router)
@account_settings_page('Datalake Pubsub Settings', '/static/settings.html')
class DatalakeExtensionWebApplication(WebApplicationBase):

    def get_error_response(self, e: Exception):
        return JSONResponse(
            {
                'error': f'{type(e).__name__} : {str(e)}',
            },
            status_code=400,
        )

    @router.get(
        '/settings',
        summary='Retrieve Datalake Pubsub Settings',
        response_model=list[Setting],
    )
    def retrieve_settings(
        self,
        installation: dict = Depends(get_installation),
    ):
        return get_all_settings(installation)

    @router.get(
        '/settings/{hub_id}/validate',
        summary='Validate Datalake Pubsub Settings',
        response_model=Setting,
    )
    def validate_settings(
            self,
            hub_id: str,
            installation: dict = Depends(get_installation),
    ):
        try:
            settings = get_settings(installation, hub_id)

            pubsub_client = GooglePubsubClient(settings)
            pubsub_client.validate()

            return settings
        except Exception as e:
            return self.get_error_response(e)

    @router.post(
        '/settings/{hub_id}',
        summary='Save Datalake Pubsub Settings',
        response_model=Setting,
    )
    def save_settings(
        self,
        hub_id: str,
        setting: SettingInput,
        installation: dict = Depends(get_installation),
        client: ConnectClient = Depends(get_installation_client),
        logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            pubsub_client = GooglePubsubClient(setting)
            pubsub_client.validate()

            return update_settings(
                client,
                installation,
                hub_id,
                setting,
            )
        except Exception as e:
            logger.exception(f'Error during saving of setting for hub {hub_id}')
            return self.get_error_response(e)

    @router.get(
        '/products',
        summary='Retrieve Product List',
        response_model=list[Product],
    )
    def list_products(
        self,
        client: ConnectClient = Depends(get_installation_client),
    ):
        return list_products(client)

    @router.post(
        '/products/*/publish',
        summary='Publish Products Info',
    )
    def publish_product_info(
        self,
        products: list[ProductInput],
        context: Context = Depends(get_call_context),
        installation: dict = Depends(get_installation),
        client: ConnectClient = Depends(get_installation_client),
        logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            create_task_publish_product(
                logger,
                client,
                context,
                installation,
                products,
            )
            return HTMLResponse(status_code=202)
        except ClientError as e:
            return self.get_error_response(e)

    @router.post(
        '/products/*/publish-all',
        summary='Publish All Products Info',
    )
    def publish_all_product_info(
            self,
            context: Context = Depends(get_call_context),
            client: ConnectClient = Depends(get_extension_client),
            installation: dict = Depends(get_installation),
            logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            create_task_publish_product(
                logger,
                client,
                context,
                installation,
            )
            return HTMLResponse(status_code=202)
        except ClientError as e:
            return self.get_error_response(e)

    @router.post(
        '/tier/configs/*/publish-all',
        summary='Publish All Tier Configs Info',
    )
    def publish_all_tc_info(
            self,
            context: Context = Depends(get_call_context),
            client: ConnectClient = Depends(get_extension_client),
            installation: dict = Depends(get_installation),
            logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            create_task_publish_tc(
                logger,
                client,
                context,
                installation,
            )
            return HTMLResponse(status_code=202)
        except ClientError as e:
            return self.get_error_response(e)

    @router.post(
        '/tier/configs/{tc_id}/publish',
        summary='Publish All Tier Configs Info',
    )
    def publish_tc_info(
            self,
            tc_id: str,
            client: ConnectClient = Depends(get_extension_client),
            installation: dict = Depends(get_installation),
            logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            tc = client('tier').configs[tc_id].get()
            hub_id = tc['connection']['hub']['id']
            setting = get_settings(installation, hub_id)
            if setting:
                pubsub_client = GooglePubsubClient(setting)
                publish_tc(
                    client,
                    pubsub_client,
                    tc,
                    logger,
                )
            else:
                logger.info(f"Publish of TC {tc['id']} is not processed"
                            f' as settings not available for respective hub.')
            return HTMLResponse(status_code=200)
        except ClientError as e:
            return self.get_error_response(e)
