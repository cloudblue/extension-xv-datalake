from datetime import datetime, timedelta

from connect.client import ConnectClient
from connect.eaas.core.inject.models import Context

from connect_ext_datalake.schemas import ProductInput


def create_task_publish_product(
    logger,
    client: ConnectClient,
    context: Context,
    installation: dict,
    products: list[ProductInput] | None = None,
):
    payload = {
        'method': 'publish_products',
        'name': f'Publish Products - {context.account_id}',
        'description': 'Publish products to Xvantage Goggle PubSub Topic. Products - All',
        'parameter': {
            'installation_id': installation['id'],
            'products': [product.dict() for product in products] if products else None,
        },
        'trigger': {
            'type': 'onetime',
            'date': (datetime.utcnow() + timedelta(0, 70)).isoformat(),
        },
    }

    if products:
        products_ids = ','.join([product.id for product in products])
        description = f'Publish {products_ids} products to Xvantage Goggle PubSub Topic.'
        payload['description'] = description

    logger.info(f'Creating dynamic one time schedule method with payload: {payload}')

    client('devops').services[context.extension_id].environments[
        context.environment_id].schedules.create(payload=payload)


def create_task_publish_tc(
    logger,
    client: ConnectClient,
    context: Context,
    installation: dict,
):
    payload = {
        'method': 'publish_tcs',
        'name': f'Publish Tier Configs - {context.account_id}',
        'description': 'Publish all Tier Configs to Xvantage Goggle PubSub Topic.',
        'parameter': {'installation_id': installation['id']},
        'trigger': {
            'type': 'onetime',
            'date': (datetime.utcnow() + timedelta(0, 70)).isoformat(),
        },
    }

    logger.info(f'Creating dynamic one time schedule method with payload: {payload}')

    client('devops').services[context.extension_id].environments[
        context.environment_id].schedules.create(payload=payload)


def create_task_publish_translation(
    logger,
    client: ConnectClient,
    context: Context,
    installation: dict,
):
    payload = {
        'method': 'publish_translations',
        'name': f'Publish Product Translations - {context.account_id}',
        'description': 'Publish all Product Translations to Xvantage Goggle PubSub Topic.',
        'parameter': {'installation_id': installation['id']},
        'trigger': {
            'type': 'onetime',
            'date': (datetime.utcnow() + timedelta(0, 70)).isoformat(),
        },
    }

    logger.info(f'Creating dynamic one time schedule method with payload: {payload}')

    client('devops').services[context.extension_id].environments[
        context.environment_id].schedules.create(payload=payload)
