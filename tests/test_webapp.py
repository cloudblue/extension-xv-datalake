# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from unittest.mock import patch

from connect.client import R
from google.api_core.exceptions import PermissionDenied

from connect_ext_datalake.schemas import SettingInput
from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.webapp import DatalakeExtensionWebApplication


def test_retrieve_settings_empty(test_client_factory):
    installation = {
        'id': 'EIN-000',
        'settings': [],
    }

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()
    assert data == []


def test_retrieve_settings(test_client_factory, setting):

    installation = {
        'id': 'EIN-000',
        'settings': [setting.dict()],
    }

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()[0]
    assert data['account_info'] == {}
    assert data['product_topic'] == ''


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_save_settings_validation_success(
    mock_client_init,
    mock_validate,
    test_client_factory,
    client_mocker_factory,
    context,
    hub,
    installation,
):
    setting = SettingInput(
        account_info={'account_id': 'acc008787827'},
        product_topic='projects/acc008787827/topics/connect-products-topic ',
    )

    client_mocker = client_mocker_factory()
    client_mocker.hubs[hub['id']].get(
        return_value=hub,
    )
    client_mocker('devops').installations['EIN-000'].update(
        return_value={},
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/settings/HB-0000-0000',
        json=setting.dict(),
        context=context,
        installation=installation,
    )
    assert response.status_code == 200

    data = response.json()
    assert data['account_info'] == setting.dict()['account_info']
    assert data['product_topic'] == setting.dict()['product_topic']


@patch.object(
    GooglePubsubClient,
    'validate',
    side_effect=PermissionDenied('Account details not valid.'),
)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_save_settings_validation_failed(
    mock_client_init,
    mock_validate,
    test_client_factory,
    installation,
):
    setting = SettingInput(
        account_info={'account_id': 'acc008787827'},
        product_topic='projects/acc008787827/topics/connect-products-topic ',
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/settings/HB-0000-0000',
        json=setting.dict(),
        context={'installation_id': 'EIN-000'},
        installation=installation,
    )
    assert response.status_code == 400

    data = response.json()
    assert data == {'error': 'PermissionDenied : 403 Account details not valid.'}


@patch.object(
    GooglePubsubClient,
    'validate',
    side_effect=PermissionDenied('Account details not valid.'),
)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_settings_validation_failed(
    mock_client_init,
    mock_validate,
    test_client_factory,
    installation,
):
    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get(
        '/api/settings/HB-0000-0000/validate',
        installation=installation,
    )
    assert response.status_code == 400

    data = response.json()
    assert data == {'error': 'PermissionDenied : 403 Account details not valid.'}


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_settings_validation_pass(
    mock_client_init,
    mock_validate,
    test_client_factory,
    installation,
    hub,
):
    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get(
        '/api/settings/HB-0000-0000/validate',
        installation=installation,
    )
    assert response.status_code == 200

    data = response.json()
    assert data['account_info'] == {}
    assert data['product_topic'] == ''


def test_list_products(
    products,
    test_client_factory,
    client_mocker_factory,
):
    client_mocker = client_mocker_factory()

    client_mocker.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all().mock(return_value=products)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/products')

    assert response.status_code == 200

    data = response.json()
    assert data == products


def test_publish_product_info_success(
    client_mocker_factory,
    test_client_factory,
    product,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']].schedules.create(return_value={})

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish',
        json=[product],
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_product_info_failed(
    client_mocker_factory,
    test_client_factory,
    product,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']].schedules.create(status_code=400)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish',
        json=[product],
        installation=installation,
        context=context,
    )

    assert response.status_code == 400


def test_publish_all_product_info_success(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']].schedules.create(return_value={})

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_all_product_info_failed(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']].schedules.create(status_code=400)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 400


def test_publish_all_tc_info_success(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']].schedules.create(return_value={})

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
        context['environment_id']].schedules.create(status_code=400)

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
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
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
