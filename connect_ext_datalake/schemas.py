# -*- coding: utf-8 -*-
#
# Copyright (c) 2023, Ingram Micro - Rahul Mondal 
# All rights reserved.
#
from typing import List, Optional

from pydantic import BaseModel, validator


class Marketplace(BaseModel):
    id: str
    name: str
    description: str
    icon: Optional[str]

    @validator('icon')
    def set_icon(cls, icon):
        return icon or '/static/images/mkp.svg'


class Settings(BaseModel):
    marketplaces: List[Marketplace] = []
