from copy import deepcopy
from unittest import TestCase
from unittest.mock import patch

from google.cloud.pubsub_v1 import PublisherClient
import pytest

from connect_ext_datalake.services import get_pubsub_client, populate_dependents


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
