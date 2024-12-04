from pydantic import BaseModel, Field
from typing import Optional

class Broker(BaseModel):
    name: str  # Name of the broker
    api_end_point: str  # API base URL for fetching data
    api_key: str  # API key for authentication
    supported_markets: Optional[list[str]] = []  # List of supported markets (e.g., "stocks", "crypto")
    rate_limit: Optional[int] = None  # API rate limit (calls per minute/hour)
    description: Optional[str] = None  # A short description of the broker's services
    country: Optional[str] = None  # Country where the broker operates
    active: bool = True  # Whether the broker is currently active for use

    class Config:
        # This allows Pydantic to handle 'snake_case' to 'camelCase' conversion if needed
        alias_generator = str.lower
