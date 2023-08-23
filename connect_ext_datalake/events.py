# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
from connect.eaas.core.extension import EventsApplicationBase

from connect_ext_datalake.services.events.product import (
    ProductEventsMixin,
    ProductTasksMixin,
)
from connect_ext_datalake.services.events.tier_config import (
    TierConfigEventsMixin,
    TierConfigTasksMixin,
)
from connect_ext_datalake.services.events.translation import (
    TranslationEventsMixin,
    TranslationTaskMixin,
)


class DatalakeExtensionEventsApplication(
    EventsApplicationBase,
    ProductEventsMixin,
    TierConfigEventsMixin,
    ProductTasksMixin,
    TierConfigTasksMixin,
    TranslationEventsMixin,
    TranslationTaskMixin,
):
    pass
