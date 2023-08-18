# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from typing import Optional

from pydantic import BaseModel


class Hub(BaseModel):
    id: str
    name: str
    icon: str | None = None


class SettingInput(BaseModel):
    account_info: dict
    product_topic: str


class Setting(SettingInput):
    hub: Hub | None = None


class Account(BaseModel):
    id: str
    name: str | None = None
    icon: str | None = None


class Product(BaseModel):
    id: str
    name: str | None = None
    icon: str | None = None
    status: str | None = None
    owner: Optional[Account] | None = None


class ProductInput(BaseModel):
    id: str
