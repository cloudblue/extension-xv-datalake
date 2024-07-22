from logging import LoggerAdapter

from connect.client import ConnectClient
from connect.client.exceptions import ClientError
from connect.eaas.core.decorators import router
from connect.eaas.core.inject.common import get_call_context, get_logger
from connect.eaas.core.inject.models import Context
from connect.eaas.core.inject.synchronous import get_extension_client, get_installation
from fastapi import Depends
from fastapi.responses import HTMLResponse

from connect_ext_datalake.services.tasks import create_task_publish_translation


class TranslationWebAppMixin:
    @router.post(
        '/localization/translations/*/publish-all',
        summary='Publish All Product Translations Info',
    )
    def publish_all_product_translations(
        self,
        context: Context = Depends(get_call_context),
        client: ConnectClient = Depends(get_extension_client),
        installation: dict = Depends(get_installation),
        logger: LoggerAdapter = Depends(get_logger),
    ):
        try:
            create_task_publish_translation(
                logger,
                client,
                context,
                installation,
            )
            return HTMLResponse(status_code=202)
        except ClientError as e:
            return self.get_error_response(e)
