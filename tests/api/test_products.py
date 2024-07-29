# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul
# All rights reserved.
#
from connect.client import R

from connect_ext_datalake.webapp import DatalakeExtensionWebApplication


def test_list_products(
    products,
    test_client_factory,
    client_mocker_factory,
):
    client_mocker = client_mocker_factory()

    client_mocker.products.filter(
        R().visibility.listing.eq(True) or R().visibility.syndication.eq(True),
    ).all().mock(return_value=products)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.get('/api/products')

    assert response.status_code == 200

    data = response.json()
    assert data == products


def test_publish_product_info_success(
    client_mocker_factory,
    test_client_factory,
    product,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(return_value={})

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish',
        json=[product],
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_product_info_failed(
    client_mocker_factory,
    test_client_factory,
    product,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(status_code=400)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish',
        json=[product],
        installation=installation,
        context=context,
    )

    assert response.status_code == 400


def test_publish_all_product_info_success(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(return_value={})

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_all_product_info_failed(
    client_mocker_factory,
    test_client_factory,
    installation,
    context,
):
    client_mocker = client_mocker_factory()

    client_mocker('devops').services[context['extension_id']].environments[
        context['environment_id']
    ].schedules.create(status_code=400)

    client = test_client_factory(DatalakeExtensionWebApplication)

    response = client.post(
        '/api/products/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 400
