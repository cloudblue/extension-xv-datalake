from copy import deepcopy
from unittest.mock import patch

from connect.client import ClientError, R
from connect.eaas.core.inject.models import Context
from google.api_core.exceptions import PermissionDenied
import pytest

from connect_ext_datalake.client import GooglePubsubClient
from connect_ext_datalake.events import DatalakeExtensionEventsApplication
from connect_ext_datalake.services import TCR_UPDATE_TYPE_MAPPING


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
@patch.object(
    GooglePubsubClient,
    'publish',
    side_effect=PermissionDenied('Account details not valid.'),
)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_listing_request_processing_failed(
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

    with pytest.raises(PermissionDenied):
        ext.handle_listing_request_processing(request)


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
    product_with_published_at_property,
    parameters,
    installation,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[product_with_published_at_property['id']].parameters.all().mock(
        return_value=parameters,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    result = ext.handle_product_changed(product_with_published_at_property)
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(
    GooglePubsubClient,
    'publish',
    side_effect=PermissionDenied('Account details not valid.'),
)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_product_changed_failed(
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

    with pytest.raises(PermissionDenied):
        ext.handle_product_changed(product)


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_products__specific_products_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    product,
    parameters,
    installation,
    schedule,
    context,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.products.filter(id__in=[product['id']]).mock(
        return_value=[product],
    )
    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
        context=Context(**context),
    )
    ext.get_installation_admin_client = lambda self: connect_client

    result = ext.publish_products(schedule)

    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_products_all_products_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    product,
    parameters,
    installation,
    schedule,
    context,
):
    test_schedule = deepcopy(schedule)
    test_schedule['parameter']['products'] = []

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all().mock(return_value=[product])

    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
        context=Context(**context),
    )
    ext.get_installation_admin_client = lambda self: connect_client

    result = ext.publish_products(test_schedule)

    assert result.status == 'success'


def test_publish_products__specific_products_failed(
    connect_client,
    client_mocker_factory,
    logger,
    product,
    installation,
    schedule,
    context,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.products.filter(id__in=[product['id']]).mock(
        status_code=400,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
        context=Context(**context),
    )
    ext.get_installation_admin_client = lambda self: connect_client

    with pytest.raises(ClientError):
        ext.publish_products(schedule)


@pytest.mark.parametrize('tcr_type', TCR_UPDATE_TYPE_MAPPING.keys())
@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_tier_config_request(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    tcr,
    tc,
    tc_params,
    installation,
    tcr_type,
):
    modified_tcr = deepcopy(tcr)
    modified_tcr['type'] = tcr_type
    parameter_names = [param['id'] for param in tc['params']]

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs[modified_tcr['configuration']['id']].get(
        return_value=tc,
    )
    client_mocker.products[tc['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(
        return_value=tc_params,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    method_map = {
        'setup': ext.handle_tier_config_setup_request_processing,
        'update': ext.handle_tier_config_change_request_processing,
        'adjustment': ext.handle_tier_config_adjustment_request_processing,
    }
    result = method_map[tcr_type](modified_tcr)
    assert result.status == 'success'


@pytest.mark.parametrize('tcr_type', TCR_UPDATE_TYPE_MAPPING.keys())
@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(
    GooglePubsubClient,
    'publish',
    side_effect=PermissionDenied('Account details not valid.'),
)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_tier_config_request_failed(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    tcr,
    tc,
    tc_params,
    installation,
    tcr_type,
):
    modified_tcr = deepcopy(tcr)
    modified_tcr['type'] = tcr_type
    parameter_names = [param['id'] for param in tc['params']]

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs[modified_tcr['configuration']['id']].get(
        return_value=tc,
    )
    client_mocker.products[tc['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(
        return_value=tc_params,
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    method_map = {
        'setup': ext.handle_tier_config_setup_request_processing,
        'update': ext.handle_tier_config_change_request_processing,
        'adjustment': ext.handle_tier_config_adjustment_request_processing,
    }

    with pytest.raises(PermissionDenied):
        method_map[tcr_type](modified_tcr)
