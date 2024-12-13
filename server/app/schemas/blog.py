from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Blog(BaseModel):
    title: str
    description: str
    content: str
    posted_at: datetime = Field(default_factory=datetime.utcnow)
    author: str
    image_url: Optional[str]
    video_url: Optional[str]
    is_published: bool = True