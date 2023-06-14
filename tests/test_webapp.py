# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#

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


def test_save_settings(test_client_factory, client_mocker_factory):
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
