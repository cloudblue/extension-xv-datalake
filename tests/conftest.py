# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
import pytest
from connect.client import AsyncConnectClient, ConnectClient


@pytest.fixture
def connect_client():
    return ConnectClient(
        'ApiKey fake_api_key',
        endpoint='https://localhost/public/v1',
    )


@pytest.fixture
def async_connect_client():
    return AsyncConnectClient(
        'ApiKey fake_api_key',
        endpoint='https://localhost/public/v1',
    )


@pytest.fixture
def logger(mocker):
    return mocker.MagicMock()


@pytest.fixture
def product():
    return {
        'id': 'PRD-000-000-001',
    }


@pytest.fixture
def parameters():
    return [
        {
            'id': 'PRM-620-087-850-0001',
            'name': 'param_a',
            'title': 'Title of the Parameter A',
            'description': 'Description of the Parameter A',
            'type': 'text',
            'scope': 'asset',
            'phase': 'fulfillment',
            'constraints': {
                'required': True,
                'hidden': False,
                'unique': False,
                'readonly': False,
                'reconciliation': False,
            },
            'position': 10000,
            'events': {
                'created': {
                    'at': '2023-01-17T15:52:08+00:00',
                },
                'updated': {
                    'at': '2023-01-17T15:52:08+00:00',
                },
            },
        },
        {
            'id': 'PRM-620-087-850-0002',
            'name': 'param_b',
            'title': 'Title of the Parameter B',
            'description': 'Description of the Parameter B',
            'type': 'text',
            'scope': 'asset',
            'phase': 'fulfillment',
            'constraints': {
                'required': True,
                'hidden': False,
                'unique': False,
                'readonly': False,
                'reconciliation': False,
            },
            'position': 20000,
            'events': {
                'created': {
                    'at': '2023-01-17T15:52:08+00:00',
                },
                'updated': {
                    'at': '2023-01-17T15:52:08+00:00',
                },
            },
        },
        {
            'id': 'PRM-620-087-850-0003',
            'name': 'IMC_ID',
            'title': 'IMC ID',
            'description': 'IMC ID',
            'type': 'text',
            'scope': 'item',
            'phase': 'configuration',
            'hint': 'I am the hint text',
            'placeholder': 'I am the placeholder text',
            'constraints': {
                'required': False,
                'hidden': False,
                'unique': False,
                'readonly': False,
                'shared': 'view',
            },
            'position': 30000,
            'events': {
                'created': {
                    'at': '2023-01-17T15:52:46+00:00',
                    'by': {
                        'id': 'UR-967-604-015',
                        'name': 'Rahul Mondal',
                    },
                },
                'updated': {
                    'at': '2023-01-17T15:59:01+00:00',
                    'by': {
                        'id': 'UR-967-604-015',
                        'name': 'Rahul Mondal',
                    },
                },
            },
        },
        {
            'id': 'PRM-620-087-850-0004',
            'name': 'TEST_ID',
            'title': 'TEST param',
            'description': 'param',
            'type': 'text',
            'scope': 'asset',
            'phase': 'ordering',
            'hint': 'I am the hint text',
            'placeholder': 'I am the placeholder text',
            'constraints': {
                'required': False,
                'hidden': False,
                'unique': False,
                'readonly': False,
            },
            'position': 40000,
            'events': {
                'created': {
                    'at': '2023-01-18T16:39:42+00:00',
                    'by': {
                        'id': 'UR-967-604-015',
                        'name': 'Rahul Mondal',
                    },
                },
                'updated': {
                    'at': '2023-01-18T16:39:42+00:00',
                },
            },
        },
    ]


@pytest.fixture
def installation():
    return {
        'id': 'EIN-000',
        'settings': {
            'account_info': {},
            'product_topic': '',
        },
    }
