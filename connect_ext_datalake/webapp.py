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

from connect_ext_datalake.schemas import Settings


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
        client('devops').installations[context.installation_id].update(
            payload={
                'settings': settings.dict(),
            },
        )
        return settings