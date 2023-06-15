from unittest.mock import patch

from google.cloud.pubsub_v1 import PublisherClient
import pytest

from connect_ext_datalake.services import get_pubsub_client


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
