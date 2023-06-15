# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
import base64
import json

from google.auth.jwt import Credentials
from google.cloud.pubsub_v1 import PublisherClient

from connect_ext_datalake.schemas import Settings


class GooglePubsubClient:
    def __init__(self, settings: Settings):
        self.account = settings.account_info
        self.topic = settings.product_topic

        credentials = Credentials.from_service_account_info(
            self.account,
            audience='https://pubsub.googleapis.com/google.pubsub.v1.Publisher',
        )

        self.publisher = PublisherClient(credentials=credentials)

    def validate(self):
        try:
            return self.publisher.get_topic({'topic': self.topic})
        except Exception:
            return False

    def publish(self, data):
        string_message = json.dumps(data)
        message = base64.b64encode(bytes(string_message, 'utf-8'))
        future = self.publisher.publish(self.topic, message, spam='eggs')

        return future.result()
