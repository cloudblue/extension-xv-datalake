# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from logging import LoggerAdapter

from connect.client import ConnectClient
from connect.client.exceptions import ClientError
from connect.eaas.core.decorators import router
from connect.eaas.core.inject.common import get_call_context, get_logger
from connect.eaas.core.inject.models import Context
from connect.eaas.core.inject.synchronous import (
    get_extension_client,
    get_installation,
    get_installation_client,
)
from fastapi import Depends
from fastapi.responses import HTMLResponse

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.services.publish import publish_tc
from connect_ext_datalake.services.tasks import create_task_publish_tc
from connect_ext_datalake.services.settings import get_settings


class TierConfigsWebAppMixin:

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
            client: ConnectClient = Depends(get_installation_client),
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
