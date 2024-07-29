from connect.client import R
from connect.client.exceptions import ClientError
from connect.eaas.core.decorators import event, schedulable
from connect.eaas.core.responses import BackgroundResponse, ScheduledExecutionResponse
from google.api_core.exceptions import GoogleAPIError

from connect_ext_datalake.services.payloads import prepare_product_data_from_listing_request
from connect_ext_datalake.services.publish import publish_payload, publish_product_list
from connect_ext_datalake.services.settings import (
    create_setting_map_from_listings,
    creating_settings_map_from_product,
)


class ProductEventsMixin:
    @event(
        'listing_request_processing',
        statuses=['completed'],
    )
    def handle_listing_request_processing(self, request):
        payload = None
        try:
            self.logger.info(f'Start processing of Listing Request {request}')
            product_settings_map = create_setting_map_from_listings(
                [request['listing']],
                self.installation,
                self.installation_client,
            )
            product_id = request['product']['id']

            settings = product_settings_map.get(product_id, [])
            payload = prepare_product_data_from_listing_request(
                self.installation_client,
                request,
            )
            publish_payload('Product', product_id, payload, settings, self.logger)
        except Exception as e:
            self.logger.exception(
                f"Publish of product {request['product']['id']} " f'is failed. Payload: {payload}',
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
            product_settings_map = creating_settings_map_from_product(
                [product],
                self.installation,
                self.installation_client,
            )

            publish_product_list(
                [product],
                product_settings_map,
                self.installation_client,
                self.logger,
            )
        except Exception as e:
            self.logger.exception(f"Publish of product {product['id']} is failed.")
            raise e

        return BackgroundResponse.done()


class ProductTasksMixin:
    @schedulable(
        'Publish Products',
        'Publish products to Xvantage Goggle PubSub Topic.',
    )
    def publish_products(self, schedule):
        self.logger.info(
            f"Start of execution for schedule {schedule['id']} " f'for publishing all products'
        )
        try:
            installation_id = schedule['parameter']['installation_id']
            products = schedule['parameter']['products']

            installation_client = self.get_installation_admin_client(installation_id)

            if products:
                product_ids = [product['id'] for product in products]
                products = list(installation_client.products.filter(id__in=product_ids))
            else:
                products = list(
                    installation_client.products.filter(
                        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
                    ).all()
                )

            installation = installation_client('devops').installations[installation_id].get()
            product_settings_map = creating_settings_map_from_product(
                products,
                installation,
                installation_client,
            )

            publish_product_list(
                products,
                product_settings_map,
                installation_client,
                self.logger,
            )

        except (ClientError, GoogleAPIError) as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()
