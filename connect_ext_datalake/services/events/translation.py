from connect.client import R
from connect.client.exceptions import ClientError
from google.api_core.exceptions import GoogleAPIError
from connect.eaas.core.decorators import event, schedulable
from connect.eaas.core.responses import (
    BackgroundResponse,
    ScheduledExecutionResponse,
)

from connect_ext_datalake.services.payloads import prepare_translation_data
from connect_ext_datalake.services.publish import publish_payload
from connect_ext_datalake.services.settings import creating_settings_map_from_product


class TranslationEventsMixin:
    @event(
        'translation_change',
        statuses=[],
    )
    def handle_translation_change(self, request):

        self.logger.info(f"Start of execution for translation with id {request['id']}")
        try:
            if (request['context']['type'] == 'product'
                    and request['status'] == 'active'):

                product = {
                    'id': request['context']['instance_id'],
                }
                product_settings_map = creating_settings_map_from_product(
                    [product],
                    self.installation,
                    self.installation_client,
                )
                settings = product_settings_map.get(product['id'], [])
                payload = prepare_translation_data(self.installation_client, request)
                publish_payload(
                    'Translation',
                    product['id'],
                    payload,
                    settings,
                    self.logger,
                )
            else:
                self.logger.info(f"Skipping translation {request['id']}"
                                 f" as type is  {request['context']['type']}")
        except Exception as e:
            self.logger.exception(f"Publish of translation {request['id']} is failed.")
            raise e
        return BackgroundResponse.done()


class TranslationTaskMixin:
    @schedulable(
        'Publish Product Translations',
        'Publish Product Translations to Xvantage Goggle PubSub Topic.',
    )
    def publish_translations(self, schedule):
        self.logger.info(
            f"Start of execution for schedule {schedule['id']} "
            f'for publishing all Product Translations')
        try:
            installation_id = schedule['parameter']['installation_id']
            installation_client = self.get_installation_admin_client(installation_id)
            installation_client.resourceset_append = False
            installation = installation_client('devops').installations[installation_id].get()

            translations = installation_client('localization').translations.filter(
                R().context.type.eq('product'),
                R().status.eq('active'),
            )
            count = translations.count()
            self.logger.info(f'Total number of Tier Configs: {count}')
            counter = 1

            products = []

            for translation in translations:
                products.append({
                    'id': translation['context']['instance_id'],
                })

            product_settings_map = creating_settings_map_from_product(
                products,
                installation,
                installation_client,
            )

            for translation in translations:
                try:
                    product_id = translation['context']['instance_id']
                    settings = product_settings_map.get(product_id, [])
                    if settings:
                        self.logger.info(f'Processing Translation in {counter} position.')
                        payload = prepare_translation_data(installation_client, translation)
                        publish_payload(
                            'Translation',
                            translation['id'],
                            payload,
                            settings,
                            self.logger,
                        )
                    else:
                        self.logger.info(
                            f"Publish of Translation {translation['id']} is not "
                            'processed as settings not available for respective hub.')
                    counter += 1
                except (ClientError, GoogleAPIError):
                    self.logger.exception(
                        "Problem in while publishing Translation {translation['id']}.")
        except ClientError as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()
