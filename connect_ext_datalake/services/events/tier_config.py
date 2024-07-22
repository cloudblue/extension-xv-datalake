from connect.client import R
from connect.client.exceptions import ClientError
from connect.eaas.core.decorators import event, schedulable
from connect.eaas.core.responses import BackgroundResponse, ScheduledExecutionResponse
from google.api_core.exceptions import GoogleAPIError

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.services.publish import publish_tc, publish_tc_from_tcr, publish_tcr
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
                publish_tcr(
                    client,
                    tcr,
                    self.logger,
                )
            else:
                self.logger.info(
                    f"Publish of TCR {tcr['id']} is not processed"
                    f" as settings not available for respective hub {hub_id}."
                )
        except Exception as e:
            self.logger.exception(f"Publish of TCR {tcr['id']} is failed.")
            raise e
        return BackgroundResponse.done()

    @event(
        'tier_config_change_request_processing',
        statuses=[
            'draft',
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
            'draft',
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
            'draft',
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
        self.logger.info(
            f"Start of execution for schedule {schedule['id']} " f'for publishing all TCs'
        )
        try:
            installation_id = schedule['parameter']['installation_id']
            installation_client = self.get_installation_admin_client(installation_id)
            installation_client.resourceset_append = False

            installation = installation_client('devops').installations[installation_id].get()
            count = installation_client('tier').configs.all().count()
            self.logger.info(f'Total number of Tier Configs: {count}')
            tcs = (
                installation_client('tier')
                .configs.all()
                .select(
                    '-account',
                    '-product',
                    '-connection',
                    '-params',
                    '-contract',
                    '-marketplace',
                )
            )
            counter = 1

            for tc in tcs:
                try:
                    tc_full = installation_client('tier').configs[tc['id']].get()
                    hub_id = tc_full['connection']['hub']['id']

                    setting = get_settings(installation, hub_id)
                    if setting:
                        pubsub_client = GooglePubsubClient(setting)
                        self.logger.info(f'Processing TC in {counter} position')
                        publish_tc(
                            installation_client,
                            pubsub_client,
                            tc_full,
                            self.logger,
                        )
                    else:
                        self.logger.info(
                            f"Publish of TC {tc['id']} is not processed"
                            f" as settings not available for respective hub."
                        )
                    counter += 1
                except (ClientError, GoogleAPIError):
                    self.logger.exception(f"Problem in while publishing Tier Config {tc['id']}.")
        except ClientError as e:
            self.logger.exception('Problem in calling Connect or Google APIs.')
            raise e

        return ScheduledExecutionResponse.done()

    @schedulable(
        'Publish TCRs',
        'Publish TCRs to Xvantage Goggle PubSub Topic. "asset_ids" and "installation_id" '
        'should be specified',
    )
    def publish_tier_config_requests(self, schedule):
        self.logger.info(
            f"Start of execution for schedule {schedule['id']} " f'for publishing all TCRs'
        )

        installation_id = schedule['parameter'].get('installation_id')
        asset_ids = schedule['parameter'].get('asset_ids')
        if installation_id is None or asset_ids is None:
            return ScheduledExecutionResponse.fail(
                'Installation_id and array of asset ids should be specified'
            )
        installation_client = self.get_installation_admin_client(installation_id)
        installation_client.resourceset_append = False
        installation = installation_client('devops').installations[installation_id].get()

        assets = (
            installation_client('subscriptions')
            .assets.all()
            .order_by('events.created.at')
            .filter(R().id.in_(asset_ids))
            .select(
                '-items',
                '-params',
                '-contract',
                '-template',
                '-marketplace',
                '-contract',
            )
        )
        unique_product_tier_accounts = set()
        for request in assets:
            tier1 = request['tiers'].get('tier1')
            if tier1:
                unique_product_tier_accounts.add((request['product']['id'], tier1['id']))
            tier2 = request['tiers'].get('tier2')
            if tier2:
                unique_product_tier_accounts.add((request['product']['id'], tier2['id']))
        self.logger.info(
            f'Number of unique pairs of TA-ProductID: {len(unique_product_tier_accounts)}'
        )

        counter = 0
        for product_id, tier_account_id in unique_product_tier_accounts:
            tier_config_requests = (
                installation_client('tier')
                .config_requests.all()
                .order_by('created')
                .filter(R().configuration__product__id.eq(product_id))
                .filter(R().configuration__account__id.eq(tier_account_id))
            )
            self.logger.info(
                f'Processing pair {product_id} - {tier_account_id} in {counter} position'
            )
            for tcr in tier_config_requests:
                try:
                    hub_id = tcr['configuration']['connection']['hub']['id']
                    setting = get_settings(installation, hub_id)
                    if setting:
                        pubsub_client = GooglePubsubClient(setting)
                        publish_tcr(
                            pubsub_client,
                            tcr,
                            self.logger,
                        )
                    else:
                        self.logger.info(
                            f"Publish of TCR {tcr['id']} is not processed"
                            f" as settings not available for respective hub."
                        )
                except (ClientError, GoogleAPIError):
                    self.logger.exception(
                        f"Problem in while publishing Tier Config Request {tcr['id']}."
                    )
            counter += 1
        return ScheduledExecutionResponse.done()
