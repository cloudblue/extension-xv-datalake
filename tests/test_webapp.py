# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from unittest.mock import patch

from connect.client import R
from google.api_core.exceptions import PermissionDenied

from connect_ext_datalake.client import GooglePubsubClient
from connect_ext_datalake.schemas import Settings
from connect_ext_datalake.webapp import DatalakeExtensionWebApplication


def test_retrieve_settings_empty(test_client_factory):
    installation = {
        'id': 'EIN-000',
        'settings': {},
    }

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()
    assert data == {'account_info': {}, 'product_topic': ''}


def test_retrieve_settings(test_client_factory):

    installation = {
        'id': 'EIN-000',
        'settings': {
            'account_info': {'account_id': 'acc008787827'},
            'product_topic': 'projects/acc008787827/topics/connect-products-topic ',
        },
    }

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()
    assert 'account_id' in data['account_info']
    assert data['account_info']['account_id'] == 'acc008787827'
    assert data['product_topic'] == 'projects/acc008787827/topics/connect-products-topic '


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_save_settings_validation_success(
    mock_client_init,
    mock_validate,
    test_client_factory,
    client_mocker_factory,
    context,
):
    settings = Settings(
        account_info={'account_id': 'acc008787827'},
        product_topic='projects/acc008787827/topics/connect-products-topic ',
    )

    client_mocker = client_mocker_factory()

    client_mocker('devops').installations['EIN-000'].update(
        return_value={},
        match_body={
            'settings': settings.dict(),
        },
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/settings',
        json=settings.dict(),
        context=context,
    )
    assert response.status_code == 200

    data = response.json()
    assert data == settings.dict()


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
):
    settings = Settings(
        account_info={'account_id': 'acc008787827'},
        product_topic='projects/acc008787827/topics/connect-products-topic ',
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/settings',
        json=settings.dict(),
        context={'installation_id': 'EIN-000'},
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
        '/api/settings/validate',
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
):
    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get(
        '/api/settings/validate',
        installation=installation,
    )
    assert response.status_code == 200

    data = response.json()
    assert data == {'account_info': {}, 'product_topic': ''}


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
