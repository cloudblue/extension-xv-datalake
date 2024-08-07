from copy import deepcopy
from unittest import TestCase
from unittest.mock import patch

import pytest
from google.cloud.pubsub_v1 import PublisherClient

from connect_ext_datalake.services.payloads import populate_dependents, sanitize_parameters
from connect_ext_datalake.services.publish import get_pubsub_client


@patch('google.auth.jwt.Credentials.from_service_account_info', return_value={})
@patch.object(PublisherClient, '__init__', return_value=None)
@patch.object(PublisherClient, 'get_topic', return_value=True)
def test_get_pubsub_client_failed(
    mock_get_topic,
    mock_init,
    mock_from_service_account_info,
    installation,
):
    mock_get_topic.side_effect = Exception('Account details not valid.')
    with pytest.raises(Exception):
        get_pubsub_client(installation)


def test_populate_dependents(
    parameter_with_dependencies,
    parameter_with_dependents,
):
    params = deepcopy(parameter_with_dependencies)
    populate_dependents(params)

    TestCase().assertListEqual(params, parameter_with_dependents)


def test_populate_dependents_positional_change(
    parameter_with_dependencies,
    parameter_with_dependents,
):
    params = deepcopy(parameter_with_dependencies)
    first_param = params.pop(0)
    params.append(first_param)
    populate_dependents(params)

    expected_param_list = deepcopy(parameter_with_dependents)
    first_param = expected_param_list.pop(0)
    expected_param_list.append(first_param)

    TestCase().assertListEqual(params, expected_param_list)


@pytest.mark.parametrize(
    'inp,outp',
    [
        [[], []],
        [[{'id': 'PRM-1'}], [{'id': 'PRM-1'}]],
        [
            [
                {
                    'id': 'PRM-1',
                    'name': '1',
                    'constraints': {
                        'hidden': True,
                        'dependency': {
                            'parameter': {
                                'id': 'PRM-2',
                                'name': '2',
                            },
                            'values': ['1'],
                            'required': True,
                            'xyz': False,
                        },
                    },
                    'events': {
                        'created': {},
                    },
                },
                {
                    'id': 'PRM-2',
                    'name': '2',
                },
                {
                    'id': 'PRM-3',
                    'name': '3',
                    'constraints': {
                        'dependency': {
                            'parameter': {
                                'id': 'PRM-2',
                                'name': '2',
                            },
                            'values': ['2', '1'],
                        },
                    },
                },
                {
                    'id': 'PRM-4',
                    'constraints': {
                        'something': True,
                        'dependency': {
                            'parameter': {
                                'id': 'PRM-1',
                                'name': '1',
                            },
                            'values': [''],
                            'required': False,
                        },
                    },
                },
            ],
            [
                {
                    'id': 'PRM-1',
                    'name': '1',
                    'constraints': {
                        'hidden': True,
                        'dependents': [
                            {
                                'id': 'PRM-4',
                                'name': None,
                                'value': [''],
                                'required': False,
                            },
                        ],
                    },
                },
                {
                    'id': 'PRM-2',
                    'name': '2',
                    'constraints': {
                        'dependents': [
                            {
                                'id': 'PRM-1',
                                'name': '1',
                                'value': ['1'],
                                'required': True,
                                'xyz': False,
                            },
                            {
                                'id': 'PRM-3',
                                'name': '3',
                                'value': ['2', '1'],
                            },
                        ],
                    },
                },
                {
                    'id': 'PRM-3',
                    'name': '3',
                    'constraints': {},
                },
                {
                    'id': 'PRM-4',
                    'constraints': {
                        'something': True,
                    },
                },
            ],
        ],
    ],
)
def test_sanitize_parameters(inp, outp):
    assert outp == sanitize_parameters(inp)
