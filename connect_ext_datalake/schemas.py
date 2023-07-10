# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Rahul Mondal
# All rights reserved.
#
from typing import Optional

from pydantic import BaseModel


class Settings(BaseModel):
    account_info: dict
    product_topic: str


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
