# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#

from connect.client import ConnectClient
from connect.eaas.core.decorators import (
    account_settings_page,
    router,
    web_app,
)
from connect.eaas.core.extension import WebApplicationBase
from connect.eaas.core.inject.common import get_call_context
from connect.eaas.core.inject.models import Context
from connect.eaas.core.inject.synchronous import get_installation, get_installation_client
from fastapi import Depends
from fastapi.responses import JSONResponse

from connect_ext_datalake.client import GooglePubsubClient
from connect_ext_datalake.schemas import Product, Settings
from connect_ext_datalake.services import list_products, publish_products


@web_app(router)
@account_settings_page('Datalake Pubsub Settings', '/static/settings.html')
class DatalakeExtensionWebApplication(WebApplicationBase):

    @router.get(
        '/settings',
        summary='Retrieve Datalake Pubsub Settings',
        response_model=Settings,
    )
    def retrieve_settings(
        self,
        installation: dict = Depends(get_installation),
    ):
        return Settings(
            account_info=installation['settings'].get('account_info', {}),
            product_topic=installation['settings'].get('product_topic', ''),
        )

    @router.get(
        '/settings/validate',
        summary='Validate Datalake Pubsub Settings',
        response_model=Settings,
    )
    def validate_settings(
            self,
            installation: dict = Depends(get_installation),
    ):
        settings = Settings(
            account_info=installation['settings'].get('account_info', {}),
            product_topic=installation['settings'].get('product_topic', ''),
        )

        pubsub_client = GooglePubsubClient(settings)

        try:
            pubsub_client.validate()

            return settings
        except Exception as e:
            return JSONResponse(
                {
                    'error': f'{type(e).__name__} : {str(e)}',
                },
                status_code=400,
            )

    @router.post(
        '/settings',
        summary='Save Datalake Pubsub Settings',
        response_model=Settings,
    )
    def save_settings(
        self,
        settings: Settings,
        context: Context = Depends(get_call_context),
        client: ConnectClient = Depends(get_installation_client),
    ):
        try:
            pubsub_client = GooglePubsubClient(settings)
            pubsub_client.validate()

            client('devops').installations[context.installation_id].update(
                payload={
                    'settings': settings.dict(),
                },
            )
            return settings
        except Exception as e:
            return JSONResponse(
                {
                    'error': f'{type(e).__name__} : {str(e)}',
                },
                status_code=400,
            )

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
        '/products/publish',
        summary='Publish Products Info',
    )
    def publish_product_info(
        self,
        products: list[Product],
        installation: dict = Depends(get_installation),
        client: ConnectClient = Depends(get_installation_client),
    ):
        publish_products(client, products, installation)
