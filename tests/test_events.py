from copy import deepcopy
from unittest.mock import patch

from connect.client import ClientError, R
from connect.eaas.core.inject.models import Context
from google.api_core.exceptions import PermissionDenied
import pytest

from connect_ext_datalake.services.client import GooglePubsubClient
from connect_ext_datalake.events import DatalakeExtensionEventsApplication
from connect_ext_datalake.services.payloads import TCR_UPDATE_TYPE_MAPPING


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
    listing_request,
    marketplace,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[listing_request['listing']['product']['id']].get(
        return_value=product,
    )
    client_mocker.products[listing_request['listing']['product']['id']].parameters.all().mock(
        return_value=parameters,
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing_request['listing']['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    result = ext.handle_listing_request_processing(listing_request)
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
    listing_request,
    marketplace,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[listing_request['listing']['product']['id']].get(
        return_value=product,
    )
    client_mocker.products[listing_request['listing']['product']['id']].parameters.all().mock(
        return_value=parameters,
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing_request['listing']['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )

    result = ext.handle_listing_request_processing(listing_request)
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_handle_listing_request_processing_remove_listing(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    product,
    installation,
    listing_request,
    marketplace,
):
    remove_listing_request = deepcopy(listing_request)
    remove_listing_request['type'] = 'remove'
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.marketplaces.filter(
        R().id.in_([listing_request['listing']['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )

    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
    )
    result = ext.handle_listing_request_processing(remove_listing_request)
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
    listing,
    marketplace,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[listing['product']['id']].parameters.all().mock(
        return_value=parameters,
    )
    client_mocker.listings.filter(
        R().product.id.in_([listing['product']['id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
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
    product_with_published_at_property,
    parameters,
    installation,
    listing,
    marketplace,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products[listing['product']['id']].parameters.all().mock(
        return_value=parameters,
    )
    client_mocker.listings.filter(
        R().product.id.in_([listing['product']['id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
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
    listing,
    marketplace,
):
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker.products.filter(id__in=[product['id']]).mock(
        return_value=[product],
    )
    client_mocker.products[product['id']].parameters.all().mock(
        return_value=parameters,
    )
    client_mocker.listings.filter(
        R().product.id.in_([listing['product']['id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
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
    listing,
    marketplace,
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
    client_mocker.listings.filter(
        R().product.id.in_([listing['product']['id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
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
    tc_processing,
    tc_params,
    installation,
    tcr_type,
    tcr_list,
):
    modified_tcr = deepcopy(tcr_list[0])
    modified_tcr['type'] = tcr_type
    parameter_names = [param['id'] for param in tc_processing['params']]

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs[modified_tcr['configuration']['id']].get(
        return_value=tc_processing,
    )
    client_mocker.products[tc_processing['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(
        return_value=tc_params,
    )
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(modified_tcr['configuration']['id']),
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
        return_value=tcr_list,
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
    tc_processing,
    tc_params,
    installation,
    tcr_type,
    tcr_list,
):
    modified_tcr = deepcopy(tcr_list[0])
    modified_tcr['type'] = tcr_type
    parameter_names = [param['id'] for param in tc_processing['params']]

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs[modified_tcr['configuration']['id']].get(
        return_value=tc_processing,
    )
    client_mocker.products[tc_processing['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(
        return_value=tc_params,
    )
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(modified_tcr['configuration']['id']),
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
        return_value=tcr_list,
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


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_tcs_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    installation,
    schedule,
    context,
    tcs,
    tc_processing,
    tcr,
    tc_params,
    tcr_list,
):
    # Prepare test data
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_tcs'
    test_schedule['parameter'].pop('products')
    parameter_names = [param['id'] for param in tc_processing['params']]

    # Mocking
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs.all().mock(return_value=tcs)
    client_mocker('tier').configs.all().count(return_value=2)
    client_mocker.products[tc_processing['product']['id']].parameters.filter(
        R().name.in_(parameter_names),
    ).mock(return_value=tc_params)
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(tcs[0]['id']),
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
        return_value=tcr_list,
    )
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(tcs[1]['id']),
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
        return_value=tcr_list,
    )
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )

    # Execute Test code
    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
        context=Context(**context),
    )
    ext.get_installation_admin_client = lambda self: connect_client

    result = ext.publish_tcs(test_schedule)

    # Assert result
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_tcs_failed(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    installation,
    schedule,
    context,
):
    # Prepare test data
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_tcs'
    test_schedule['parameter'].pop('products')

    # Mocking
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker('tier').configs.all().count(return_value=400)

    # Execute Test code
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
        ext.publish_tcs(test_schedule)


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_tcs_individual_failed(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    installation,
    schedule,
    context,
    tc_processing,
    tcr,
    tcr_list,
):
    # Prepare test data
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_tcs'
    test_schedule['parameter'].pop('products')

    # Mocking
    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('tier').configs.all().mock(return_value=[tc_processing])
    client_mocker('tier').configs.all().count(return_value=1)
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker('tier').config_requests.filter(
        R().configuration.id.eq(tc_processing['id']),
    ).select('-tiers', '-configuration').order_by('-created').first().mock(
        status_code=400,
    )

    # Execute Test code
    ext = DatalakeExtensionEventsApplication(
        connect_client,
        logger,
        config={},
        installation_client=connect_client,
        installation=installation,
        context=Context(**context),
    )
    ext.get_installation_admin_client = lambda self: connect_client

    result = ext.publish_tcs(test_schedule)

    # Assert result
    assert result.status == 'success'


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_products_all_products_individual_failed(
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
    listing,
    marketplace,
):
    test_schedule = deepcopy(schedule)
    test_schedule['parameter']['products'] = []

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)

    client_mocker.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all().mock(return_value=[product])
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker.listings.filter(
        R().product.id.in_([listing['product']['id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )

    client_mocker.products[product['id']].parameters.all().mock(
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
        ext.publish_products(test_schedule)
