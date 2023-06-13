# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal 
# All rights reserved.
#
from connect_ext_datalake.events import Extension-Xv-DatalakeEventsApplication


def test_handle_listing_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = Extension-Xv-DatalakeEventsApplication(connect_client, logger, config)
    result = ext.handle_listing_request_processing(request)
    assert result.status == 'success'


def test_handle_product_changed(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = Extension-Xv-DatalakeEventsApplication(connect_client, logger, config)
    result = ext.handle_product_changed(request)
    assert result.status == 'success'


def test_execute_scheduled_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = Extension-Xv-DatalakeEventsApplication(connect_client, logger, config)
    result = ext.execute_scheduled_processing(request)
    assert result.status == 'success'
