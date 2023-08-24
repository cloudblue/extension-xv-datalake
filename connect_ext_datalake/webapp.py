# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from connect.eaas.core.decorators import (
    account_settings_page,
    router,
    web_app,
)
from connect.eaas.core.extension import WebApplicationBase
from fastapi.responses import JSONResponse

from connect_ext_datalake.apis import (
    ProductsWebAppMixin,
    SettingsWebAppMixin,
    TierConfigsWebAppMixin,
    TranslationWebAppMixin,
)


@web_app(router)
@account_settings_page('Datalake Pubsub Settings', '/static/settings.html')
class DatalakeExtensionWebApplication(
    WebApplicationBase,
    ProductsWebAppMixin,
    SettingsWebAppMixin,
    TierConfigsWebAppMixin,
    TranslationWebAppMixin,
):

    def get_error_response(self, e: Exception):
        return JSONResponse(
            {
                'error': f'{type(e).__name__} : {str(e)}',
            },
            status_code=400,
        )
