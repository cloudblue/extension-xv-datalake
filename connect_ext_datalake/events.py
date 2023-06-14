# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.eaas.core.decorators import event
from connect.eaas.core.extension import EventsApplicationBase
from connect.eaas.core.responses import BackgroundResponse

from connect_ext_datalake.client import GooglePubsubClient
from connect_ext_datalake.schemas import Settings
from connect_ext_datalake.services import (
    get_pubsub_client,
    prepare_product_data_from_listing_request,
    prepare_product_data_from_product,
)


class DatalakeExtensionEventsApplication(EventsApplicationBase):

    @event(
        'listing_request_processing',
        statuses=['completed'],
    )
    def handle_listing_request_processing(self, request):
        client = get_pubsub_client(self.installation)

        payload = prepare_product_data_from_listing_request(
            self.installation_client, request,
        )
        client.publish(payload)

        return BackgroundResponse.done()

    @event(
        'product_changed',
        statuses=['published', 'endofsale'],
    )
    def handle_product_changed(self, product):
        client = get_pubsub_client(self.installation)

        payload = prepare_product_data_from_product(
            self.installation_client,
            product,
        )
        client.publish(payload)

        return BackgroundResponse.done()
