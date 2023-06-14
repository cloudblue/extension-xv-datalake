# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.eaas.core.decorators import event
from connect.eaas.core.extension import EventsApplicationBase
from connect.eaas.core.responses import BackgroundResponse


class DatalakeExtensionEventsApplication(EventsApplicationBase):
    @event(
        'listing_request_processing',
        statuses=['completed'],
    )
    def handle_listing_request_processing(self, request):
        self.logger.info(f"Obtained request with id {request['id']}")
        return BackgroundResponse.done()

    @event(
        'product_changed',
        statuses=['published', 'endofsale'],
    )
    def handle_product_changed(self, request):
        self.logger.info(f"Obtained request with id {request['id']}")
        return BackgroundResponse.done()
