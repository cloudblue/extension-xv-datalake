# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.eaas.core.extension import EventsApplicationBase

from connect_ext_datalake.services.events import (
    FulfillmentEventsMixin,
    FulfillmentTasksMixin,
    TierConfigEventsMixin,
    TierConfigTasksMixin,
    TranslationEventsMixin,
    TranslationTaskMixin,
)
from connect_ext_datalake.services.events.product import ProductEventsMixin, ProductTasksMixin


class DatalakeExtensionEventsApplication(
    EventsApplicationBase,
    ProductEventsMixin,
    TierConfigEventsMixin,
    ProductTasksMixin,
    TierConfigTasksMixin,
    TranslationEventsMixin,
    TranslationTaskMixin,
    FulfillmentEventsMixin,
    FulfillmentTasksMixin,
):
    pass
