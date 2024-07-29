# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from unittest.mock import patch

from connect.client import R

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.webapp import DatalakeExtensionWebApplication


def test_publish_all_tc_info_success(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(return_value={})

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/tier/configs/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_all_tc_info_failed(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(status_code=400)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/tier/configs/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 400


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_tc_info_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
    tc_active,
    tc_params,
    tcr_list,
):
    parameter_names = [param['id'] for param in tc_active['params']]

    client_mocker = client_mocker_factory()
    client_mocker('tier').configs[tc_active['id']].get(
        return_value=tc_active,
    )
    client_mocker.products[tc_active['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(return_value=tc_params)
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(tc_active['id']),
    ).select(
        '-tiers', '-configuration'
    ).order_by('-created').first().mock(
        return_value=tcr_list,
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        f"/api/tier/configs/{tc_active['id']}/publish",
        installation=installation,
        context=context,
    )

    assert response.status_code == 200


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_tc_info_failed(
    mock_client_init,
    mock_publish,
    mock_validate,
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
    tc_active,
):

    client_mocker = client_mocker_factory()
    client_mocker('tier').configs[tc_active['id']].get(
        status_code=400,
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        f"/api/tier/configs/{tc_active['id']}/publish",
        installation=installation,
        context=context,
    )

    assert response.status_code == 400
