from connect_ext_datalake.webapp import DatalakeExtensionWebApplication


def test_publish_all_product_translations_success(
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
        '/api/localization/translations/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 202


def test_publish_all_product_translations_failed(
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
        '/api/localization/translations/*/publish-all',
        installation=installation,
        context=context,
    )

    assert response.status_code == 400
