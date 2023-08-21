from connect.client import ConnectClient
from connect.client import R

from connect_ext_datalake.schemas import Hub, Setting, SettingInput


def get_all_settings(installation: dict):
    settings = []

    if 'settings' in installation.keys() and isinstance(installation['settings'], list):
        for setting in installation['settings']:
            hub = Hub.parse_obj(setting['hub'])
            setting = Setting.parse_obj(setting)
            setting.hub = hub
            settings.append(setting)

    return settings


def get_settings(installation: dict, hub_id: str):
    setting = None
    if 'settings' in installation.keys() and isinstance(installation['settings'], list):
        for s in installation['settings']:
            if hub_id == s['hub']['id']:
                hub = Hub.parse_obj(s['hub'])
                setting = Setting.parse_obj(s)
                setting.hub = hub
                break
    return setting


def update_settings(
    client: ConnectClient,
    installation: dict,
    hub_id: str,
    setting: SettingInput,
):
    hub = client.hubs[hub_id].get()
    existing_setting = None

    if 'settings' in installation.keys() and isinstance(installation['settings'], list):
        for s in installation['settings']:
            if hub_id == s['hub']['id']:
                existing_setting = s
                break
    else:
        installation['settings'] = []

    if not existing_setting:
        existing_setting = {}
        installation['settings'].append(existing_setting)

    existing_setting['account_info'] = setting.account_info
    existing_setting['product_topic'] = setting.product_topic
    existing_setting['hub'] = {
        'id': hub['id'],
        'name': hub['name'],
    }

    client('devops').installations[installation['id']].update(
        payload={
            'settings': installation['settings'],
        },
    )
    return existing_setting


def prepare_product_marketplace_map(listings: list):
    product_marketplace_map = {}
    for listing in listings:
        if listing['product']['id'] not in product_marketplace_map.keys():
            product_marketplace_map[listing['product']['id']] = []

        product_marketplace_map[listing['product']['id']].append(
            listing['contract']['marketplace']['id'],
        )

    return product_marketplace_map


def prepare_marketplace_hub_map(client: ConnectClient, marketplace_ids: list):
    marketplaces = list(client.marketplaces.filter(
        R().id.in_(marketplace_ids),
    ))
    return {
        marketplace['id']: [
            hub['hub']['id'] for hub in marketplace.get('hubs', [])
        ] for marketplace in marketplaces
    }


def prepare_product_hub_map(
    product_marketplace_map: dict,
    marketplace_hub_map: dict,
):
    product_hub_map = {}

    for product_id, marketplace_ids in product_marketplace_map.items():
        if product_id not in product_hub_map.keys():
            product_hub_map[product_id] = set()
        for marketplace_id in marketplace_ids:
            product_hub_map[product_id].update(marketplace_hub_map[marketplace_id])

    return product_hub_map


def create_setting_map_from_listings(
    listings: list,
    installation: dict,
    client: ConnectClient,
):
    product_marketplace_map = prepare_product_marketplace_map(listings)

    marketplace_hub_map = prepare_marketplace_hub_map(
        client,
        [mkt_id for sublist in product_marketplace_map.values() for mkt_id in sublist],
    )

    product_hub_map = prepare_product_hub_map(
        product_marketplace_map,
        marketplace_hub_map,
    )

    product_settings_map = {}
    for product_id, hub_ids in product_hub_map.items():
        if product_id not in product_settings_map.keys():
            product_settings_map[product_id] = []
        for hub_id in hub_ids:
            setting = get_settings(installation, hub_id)
            if setting:
                product_settings_map[product_id].append(setting)

    return product_settings_map


def creating_settings_map_from_product(
    products: list,
    installation: dict,
    client: ConnectClient,
):
    listings = list(client.listings.filter(
        R().product.id.in_([product['id'] for product in products]),
    ))

    return create_setting_map_from_listings(
        listings,
        installation,
        client,
    )
