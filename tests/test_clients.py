from asyncio import Future
from unittest.mock import patch

import pytest
from google.cloud.pubsub_v1 import PublisherClient

from connect_ext_datalake.services.client import GooglePubsubClient


@patch('google.auth.jwt.Credentials.from_service_account_info', return_value={})
@patch.object(PublisherClient, '__init__', return_value=None)
@patch.object(PublisherClient, 'get_topic', return_value=True)
def test_validate_success(
    mock_get_topic,
    mock_init,
    mock_from_service_account_info,
    setting,
):
    client = GooglePubsubClient(setting)

    assert client.validate()


@patch('google.auth.jwt.Credentials.from_service_account_info', return_value={})
@patch.object(PublisherClient, '__init__', return_value=None)
@patch.object(PublisherClient, 'get_topic')
def test_validate_failed(
    mock_get_topic,
    mock_init,
    mock_from_service_account_info,
    setting,
):
    mock_get_topic.side_effect = Exception('Account details not valid.')

    client = GooglePubsubClient(setting)

    with pytest.raises(Exception):
        client.validate()


@patch('google.auth.jwt.Credentials.from_service_account_info', return_value={})
@patch.object(PublisherClient, '__init__', return_value=None)
@patch.object(PublisherClient, 'publish')
def test_publish(
    mock_publish,
    mock_init,
    mock_from_service_account_info,
    setting,
):
    future = Future()
    future.set_result(True)

    mock_publish.return_value = future

    client = GooglePubsubClient(setting)

    result = client.publish(data={'id': 'PRD-000-000-000'})

    assert result
