# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from unittest.mock import patch

from connect.client import R

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
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_save_settings_validation_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    test_client_factory,
    client_mocker_factory,
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
        context={'installation_id': 'EIN-000'},
    )
    assert response.status_code == 200

    data = response.json()
    assert data == settings.dict()


@patch.object(GooglePubsubClient, 'validate', return_value=False)
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
    assert data == {'detail': 'Configuration validation failed!'}


def test_list_products(test_client_factory, client_mocker_factory):
    products = [
        {
            'id': 'PRD-000-000-001',
            'name': 'Test Cisco Product',
            'icon': '/media/VA-000-001/PRD-000-000-001/media/PRD-000-000-001-logo.png',
            'status': 'published',
        },
        {
            'id': 'PRD-000-000-002',
            'name': 'A-R18-Dropbox-1',
            'icon': '/media/VA-000-001/PRD-000-000-002/media/PRD-000-000-002-logo.png',
            'status': 'published',
        },
        {
            'id': 'PRD-000-000-003',
            'name': 'Product CB A1',
            'icon': '/media/VA-000-001/PRD-000-000-003/media/PRD-000-000-003-logo.png',
            'status': 'published',
        },
    ]

    client_mocker = client_mocker_factory()

    client_mocker.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all().mock(return_value=products)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/products')

    assert response.status_code == 200

    data = response.json()
    assert data == products


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_product_info(
    mock_client_init,
    mock_publish,
    mock_validate,
    test_client_factory,
    client_mocker_factory,
    product,
    parameters,
    installation,
):

    client_mocker = client_mocker_factory()

    client_mocker.products.filter(
        id__in=[product['id']],
    ).all().mock(
        return_value=[product],
    )
    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/publish',
        json=[product],
        installation=installation,
    )

    assert response.status_code == 200
