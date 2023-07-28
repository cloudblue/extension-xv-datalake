# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal
# All rights reserved.
#
import json
from datetime import datetime

import pytest
from connect.client import AsyncConnectClient, ConnectClient

from connect_ext_datalake.schemas import Settings


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
def product_with_published_at_property():
    return {
        'id': 'PRD-000-000-001',
        'published_at': '2023-07-09T17:38:19+00:00',
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
def products():
    return [
        {
            'id': 'PRD-000-000-001',
            'name': 'Test Cisco Product',
            'icon': '/media/VA-000-001/PRD-000-000-001/media/PRD-000-000-001-logo.png',
            'status': 'published',
            'owner': {
                'id': 'VA-000-000',
                'name': 'CloudBlue ISV',
                'icon': '/media/VA-674-253/media/icon_fobt0xS.png',
            },
        },
        {
            'id': 'PRD-000-000-002',
            'name': 'A-R18-Dropbox-1',
            'icon': '/media/VA-000-001/PRD-000-000-002/media/PRD-000-000-002-logo.png',
            'status': 'published',
            'owner': {
                'id': 'VA-000-000',
                'name': 'CloudBlue ISV',
                'icon': '/media/VA-674-253/media/icon_fobt0xS.png',
            },
        },
        {
            'id': 'PRD-000-000-003',
            'name': 'Product CB A1',
            'icon': '/media/VA-000-001/PRD-000-000-003/media/PRD-000-000-003-logo.png',
            'status': 'published',
            'owner': {
                'id': 'VA-000-000',
                'name': 'CloudBlue ISV',
                'icon': '/media/VA-674-253/media/icon_fobt0xS.png',
            },
        },
    ]


@pytest.fixture
def settings():
    return Settings.parse_obj(
        {
            'account_info': {},
            'product_topic': '',
            'tier_config_topic': '',
        },
    )


@pytest.fixture
def installation(settings):
    return {
        'id': 'EIN-000',
        'settings': settings.dict(),
    }


@pytest.fixture
def context(settings):
    return {
        'installation_id': 'EIN-000',
        'account_id': 'PA-000-000',
        'extension_id': 'EXT-000',
        'environment_id': 'ENV-000',
    }


@pytest.fixture
def schedule(
    installation,
    product,
):
    return {
        'id': 'SCH-000',
        'method': 'publish_products',
        'name': 'Publish Products',
        'description': 'Publish products to Xvantage Goggle PubSub Topic.',
        'parameter': {
            'installation': installation,
            'products': [product],
        },
        'trigger': {
            'type': 'onetime',
            'date': datetime.utcnow().isoformat(),
        },
    }


@pytest.fixture
def tcr():
    return {
        'id': 'TCR-000-000-000-001',
        'type': 'setup',
        'status': 'approved',
        'configuration': {
            'id': 'TC-000-000-000',
            'name': 'Configuration of TA-0000-0000-0000',
        },
    }


@pytest.fixture
def tc():
    return json.load(open('./tests/fixtures/tc.json'))


@pytest.fixture
def tc_params():
    return json.load(open('./tests/fixtures/tc_params.json'))
