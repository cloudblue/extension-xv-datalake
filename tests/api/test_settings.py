# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from copy import deepcopy
from unittest.mock import patch

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


def test_list_hubs(
    hub,
    test_client_factory,
    client_mocker_factory,
):
    client_mocker = client_mocker_factory()

    client_mocker.hubs.all().mock(return_value=[hub])

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/hubs')

    assert response.status_code == 200

    data = response.json()
    assert data[0]['id'] == hub['id']
    assert data[0]['name'] == hub['name']


def test_remove_settings_validation_success(
    test_client_factory,
    client_mocker_factory,
    context,
    hub,
    installation,
):
    client_mocker = client_mocker_factory()
    client_mocker('devops').installations['EIN-000'].update(
        return_value={},
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.delete(
        '/api/settings/HB-0000-0000',
        context=context,
        installation=installation,
    )

    assert response.status_code == 200


def test_remove_settings_validation_success_no_settings(
    test_client_factory,
    client_mocker_factory,
    context,
    hub,
    installation,
):
    cloned_installation = deepcopy(installation)
    cloned_installation['settings'] = {}
    client_mocker = client_mocker_factory()
    client_mocker('devops').installations['EIN-000'].update(
        return_value={},
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.delete(
        '/api/settings/HB-0000-0000',
        context=context,
        installation=cloned_installation,
    )

    assert response.status_code == 200
