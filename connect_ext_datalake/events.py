# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.client import R
from connect.client.exceptions import ClientError
from google.api_core.exceptions import GoogleAPIError
from connect.eaas.core.decorators import event, schedulable
from connect.eaas.core.extension import EventsApplicationBase
from connect.eaas.core.responses import (
    BackgroundResponse,
    ScheduledExecutionResponse,
)

from connect_ext_datalake.services import (
    get_pubsub_client,
    prepare_product_data_from_listing_request,
    publish_product,
    publish_tc,
    publish_tc_from_tcr,
)


class DatalakeExtensionEventsApplication(EventsApplicationBase):

    @event(
        'listing_request_processing',
        statuses=['completed'],
    )
    def handle_listing_request_processing(self, request):
        payload = None
        try:
            self.logger.info(f'Start processing of Listing Request {request}')
            client = get_pubsub_client(self.installation)

            payload = prepare_product_data_from_listing_request(
                self.installation_client, request,
            )
            client.publish(payload)
            self.logger.info(
                f"Publish of product {request['product']['id']} "
                f'is successful. Payload: {payload}',
            )
        except Exception as e:
            self.logger.exception(
                f"Publish of product {request['product']['id']} "
                f'is failed. Payload: {payload}',
            )
            raise e

        return BackgroundResponse.done()

    @event(
        'product_changed',
        statuses=['published', 'endofsale'],
    )
    def handle_product_changed(self, product):
        self.logger.info(f"Start of execution for product event {product['id']}.")
        try:
            client = get_pubsub_client(self.installation)
            publish_product(
                self.installation_client,
                client,
                product,
                self.logger,
            )
        except Exception as e:
            self.logger.exception(f"Publish of product {product['id']} is failed.")
            raise e

        return BackgroundResponse.done()

    def __process_tcr_event(self, tcr):
        self.logger.info(f"Obtained request with id {tcr['id']}")
        try:
            client = get_pubsub_client(self.installation)
            publish_tc_from_tcr(
                self.installation_client,
                client,
                tcr,
                self.logger,
            )
        except Exception as e:
            self.logger.exception(f"Publish of product {tcr['id']} is failed.")
            raise e
        return BackgroundResponse.done()

    @event(
        'tier_config_change_request_processing',
        statuses=['approved'],
    )
    def handle_tier_config_change_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)

    @event(
        'tier_config_adjustment_request_processing',
        statuses=['approved'],
    )
    def handle_tier_config_adjustment_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)

    @event(
        'tier_config_setup_request_processing',
        statuses=['approved'],
    )
    def handle_tier_config_setup_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)

    @schedulable(
        'Publish Products',
        'Publish products to Xvantage Goggle PubSub Topic.',
    )
    def publish_products(self, schedule):
        self.logger.info(f"Start of execution for schedule {schedule['id']} "
                         f'for publishing all products')
        try:
            installation = schedule['parameter']['installation']
            products = schedule['parameter']['products']

            installation_client = self.get_installation_admin_client(installation['id'])

            if products:
                product_ids = [product['id'] for product in products]
                products = list(installation_client.products.filter(id__in=product_ids))
            else:
                products = list(installation_client.products.filter(
                    R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
                ).all())

            pubsub_client = get_pubsub_client(installation)

            for product in products:
                try:
                    publish_product(
                        installation_client,
                        pubsub_client,
                        product,
                        self.logger,
                    )
                except (ClientError, GoogleAPIError):
                    self.logger.exception(f"Problem in while publishing Product {product['id']}.")
        except (ClientError, GoogleAPIError) as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()

    @schedulable(
        'Publish TCs',
        'Publish TCs to Xvantage Goggle PubSub Topic.',
    )
    def publish_tcs(self, schedule):
        self.logger.info(f"Start of execution for schedule {schedule['id']} "
                         f'for publishing all TCs')
        try:
            installation = schedule['parameter']['installation']
            installation_client = self.get_installation_admin_client(installation['id'])

            count = installation_client('tier').configs.all().count()
            self.logger.info(f'Total number of Tier Configs: {count}')
            tcs = installation_client('tier').configs.all()
            pubsub_client = get_pubsub_client(installation)
            counter = 1

            for tc in tcs:
                try:
                    self.logger.info(f'Processing TC in {counter} position')
                    publish_tc(
                        installation_client,
                        pubsub_client,
                        tc,
                        self.logger,
                    )
                    counter += 1
                except (ClientError, GoogleAPIError):
                    self.logger.exception(f"Problem in while publishing Tier Config {tc['id']}.")
        except (ClientError, GoogleAPIError) as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()
