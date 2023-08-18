from connect.client.exceptions import ClientError
from google.api_core.exceptions import GoogleAPIError
from connect.eaas.core.decorators import event, schedulable
from connect.eaas.core.responses import (
    BackgroundResponse,
    ScheduledExecutionResponse,
)

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.services.publish import (
    publish_tc,
    publish_tc_from_tcr,
)
from connect_ext_datalake.services.settings import get_settings


class TierConfigEventsMixin:
    def __process_tcr_event(self, tcr):
        self.logger.info(f"Obtained request with id {tcr['id']}")
        try:
            hub_id = tcr['configuration']['connection']['hub']['id']
            setting = get_settings(self.installation, hub_id)
            if setting:
                client = GooglePubsubClient(setting)
                publish_tc_from_tcr(
                    self.installation_client,
                    client,
                    tcr,
                    self.logger,
                )
            else:
                self.logger.info(f"Publish of TCR {tcr['id']} is not processed"
                                 f" as settings not available for respective hub.")
        except Exception as e:
            self.logger.exception(f"Publish of TCR {tcr['id']} is failed.")
            raise e
        return BackgroundResponse.done()

    @event(
        'tier_config_change_request_processing',
        statuses=[
            'pending',
            'approved',
            'failed',
            'inquiring',
        ],
    )
    def handle_tier_config_change_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)

    @event(
        'tier_config_adjustment_request_processing',
        statuses=[
            'pending',
            'approved',
            'failed',
            'inquiring',
        ],
    )
    def handle_tier_config_adjustment_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)

    @event(
        'tier_config_setup_request_processing',
        statuses=[
            'pending',
            'approved',
            'failed',
            'inquiring',
        ],
    )
    def handle_tier_config_setup_request_processing(self, tcr):
        return self.__process_tcr_event(tcr)


class TierConfigTasksMixin:
    @schedulable(
        'Publish TCs',
        'Publish TCs to Xvantage Goggle PubSub Topic.',
    )
    def publish_tcs(self, schedule):
        self.logger.info(f"Start of execution for schedule {schedule['id']} "
                         f'for publishing all TCs')
        try:
            installation_id = schedule['parameter']['installation_id']
            installation_client = self.get_installation_admin_client(installation_id)
            installation_client.resourceset_append = False

            installation = installation_client('devops').installations[installation_id].get()
            count = installation_client('tier').configs.all().count()
            self.logger.info(f'Total number of Tier Configs: {count}')
            tcs = installation_client('tier').configs.all()
            counter = 1

            for tc in tcs:
                try:
                    hub_id = tc['connection']['hub']['id']

                    setting = get_settings(installation, hub_id)
                    if setting:
                        pubsub_client = GooglePubsubClient(setting)
                        self.logger.info(f'Processing TC in {counter} position')
                        publish_tc(
                            installation_client,
                            pubsub_client,
                            tc,
                            self.logger,
                        )
                    else:
                        self.logger.info(f"Publish of TC {tc['id']} is not processed"
                                         f" as settings not available for respective hub.")
                    counter += 1
                except (ClientError, GoogleAPIError):
                    self.logger.exception(f"Problem in while publishing Tier Config {tc['id']}.")
        except ClientError as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()
