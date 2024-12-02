from pydantic import BaseModel
from typing import List, Optional

class BrokerData(BaseModel):
    name: str
    asset: str
    value: float
    currency: str
    time: str

    class config: 
        orm_mode = True

class Broker(BaseModel):
    broker_name : str
    data: List[BrokerData]