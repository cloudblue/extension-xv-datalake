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

from connect_ext_datalake.schemas import (
    Product,
    ProductInput,
)
from connect_ext_datalake.services.publish import list_products
from connect_ext_datalake.services.tasks import create_task_publish_product


class ProductsWebAppMixin:

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
        client: ConnectClient = Depends(get_extension_client),
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
