from connect.eaas.core.decorators import event
from connect.eaas.core.responses import BackgroundResponse

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
            if request['context']['type'] == 'product':

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
                publish_payload('Translation', product['id'], payload, settings, self.logger)
            else:
                self.logger.info(f"Skipping translation {request['id']}"
                                 f" as type is  {request['context']['type']}")
        except Exception as e:
            self.logger.exception(f"Publish of translation {request['id']} is failed.")
            raise e
        return BackgroundResponse.done()
