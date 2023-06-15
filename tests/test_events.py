from unittest.mock import patch

from connect_ext_datalake.client import GooglePubsubClient
from connect_ext_datalake.events import DatalakeExtensionEventsApplication


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_listing_request_processing_new_listing(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    product,
    parameters,
    installation,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[product['id']].get(
        return_value=product,
    )
    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )

    request = {
        'id': 1,
        'product': {
            'id': 'PRD-000-000-001',
        },
        'type': 'new',
    }
    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    result = ext.handle_listing_request_processing(request)
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_listing_request_processing_remove_listing(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    logger,
    installation,
):
    request = {
        'id': 1,
        'product': {
            'id': 'PRD-000-000-001',
        },
        'type': 'remove',
    }
    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation=installation,
    )
    result = ext.handle_listing_request_processing(request)
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_product_changed(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    product,
    parameters,
    installation,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    result = ext.handle_product_changed(product)
    assert result.status == 'success'
