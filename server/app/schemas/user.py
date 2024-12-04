from typing import List
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