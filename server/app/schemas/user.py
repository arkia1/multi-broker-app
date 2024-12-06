from typing import List, Optional
from pydantic import BaseModel, EmailStr

# User registration request schema
class UserRegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

# User login request schema
class UserLoginRequest(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    username: str
    email: EmailStr
    connected_brokers: List[str]
    preferences: List[str]
    url_to_image : Optional[str]

# User update request schema
class UserUpdateModel(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr] = None
    connected_brokers: Optional[List[str]] = None
    preferences: Optional[List[str]] = None
    url_to_image : Optional[str]


