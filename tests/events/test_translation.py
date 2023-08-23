from copy import deepcopy
from unittest.mock import patch

import pytest
from connect.client import ClientError, R
from connect.eaas.core.inject.models import Context

from connect_ext_datalake.events import DatalakeExtensionEventsApplication
from connect_ext_datalake.services.client import GooglePubsubClient


@patch.object(GooglePubsubClient, 'validate', return_value=True)
@patch.object(GooglePubsubClient, 'publish', return_value=True)
@patch.object(GooglePubsubClient, '__init__', return_value=None)
def test_publish_translations_success(
    mock_client_init,
    mock_publish,
    mock_validate,
    connect_client,
    client_mocker_factory,
    logger,
    translation,
    translation_attributes,
    installation,
    listing,
    marketplace,
    schedule,
    context,
):
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_translations'
    test_schedule['parameter'].pop('products')

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker('localization').translations.filter(
        R().context.type.eq('product'),
        R().status.eq('active'),
    ).mock(
        return_value=[translation],
    )
    client_mocker('localization').translations.filter(
        R().context.type.eq('product'),
        R().status.eq('active'),
    ).count(return_value=1)
    client_mocker.listings.filter(
        R().product.id.in_([translation['context']['instance_id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )
    client_mocker('localization').translations[translation['id']].attributes.all().mock(
        return_value=translation_attributes,
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

    result = ext.publish_translations(test_schedule)
    assert result.status == 'success'


def test_publish_translations_individual_failure(
    connect_client,
    client_mocker_factory,
    logger,
    translation,
    installation,
    listing,
    marketplace,
    schedule,
    context,
):
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_translations'
    test_schedule['parameter'].pop('products')

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker('localization').translations.filter(
        R().context.type.eq('product'),
        R().status.eq('active'),
    ).mock(
        return_value=[translation],
    )
    client_mocker('localization').translations.filter(
        R().context.type.eq('product'),
        R().status.eq('active'),
    ).count(return_value=1)
    client_mocker.listings.filter(
        R().product.id.in_([translation['context']['instance_id']]),
    ).mock(
        return_value=[listing],
    )
    client_mocker.marketplaces.filter(
        R().id.in_([listing['contract']['marketplace']['id']]),
    ).mock(
        return_value=[marketplace],
    )
    client_mocker('localization').translations[translation['id']].attributes.all().mock(
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

    result = ext.publish_translations(test_schedule)
    assert result.status == 'success'


def test_publish_translations_failure(
    connect_client,
    client_mocker_factory,
    logger,
    installation,
    schedule,
    context,
):
    test_schedule = deepcopy(schedule)
    test_schedule['method'] = 'publish_translations'
    test_schedule['parameter'].pop('products')

    client_mocker = client_mocker_factory(base_url=connect_client.endpoint)
    client_mocker('devops').installations[installation['id']].get(
        return_value=installation,
    )
    client_mocker('localization').translations.filter(
        R().context.type.eq('product'),
        R().status.eq('active'),
    ).count(status_code=400)

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
        ext.publish_translations(test_schedule)
