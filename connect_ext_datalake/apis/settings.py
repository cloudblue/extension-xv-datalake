# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from logging import LoggerAdapter

from connect.client import ConnectClient
from connect.eaas.core.decorators import router
from connect.eaas.core.inject.common import get_logger
from connect.eaas.core.inject.synchronous import (
    get_installation,
    get_installation_client,
)
from fastapi import Depends

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.schemas import (
    Hub,
    Setting,
    SettingInput,
)
from connect_ext_datalake.services.publish import list_hubs
from connect_ext_datalake.services.settings import (
    delete_settings,
    get_all_settings,
    get_settings,
    update_settings,
)


class SettingsWebAppMixin:

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

    @router.delete(
        '/settings/{hub_id}',
        summary='Clear Datalake Pubsub Settings',
    )
    def remove_settings(
            self,
            hub_id: str,
            installation: dict = Depends(get_installation),
            client: ConnectClient = Depends(get_installation_client),
            logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            delete_settings(
                client,
                installation,
                hub_id,
            )
        except Exception as e:
            logger.exception(f'Error during saving of setting for hub {hub_id}')
            return self.get_error_response(e)

    @router.get(
        '/hubs',
        summary='Retrieve Product List',
        response_model=list[Hub],
    )
    def list_hubs(
            self,
            client: ConnectClient = Depends(get_installation_client),
    ):
        return list_hubs(client)
