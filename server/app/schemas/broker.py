from pydantic import BaseModel

class Broker(BaseModel):
    name: str
    api_end_point: str
    api_key: str
    