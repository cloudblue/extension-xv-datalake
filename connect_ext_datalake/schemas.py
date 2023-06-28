# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#

from pydantic import BaseModel


class Settings(BaseModel):
    account_info: dict
    product_topic: str


class Product(BaseModel):
    id: str
    name: str | None = None
    icon: str | None = None
    status: str | None = None


class ProductInput(BaseModel):
    id: str
