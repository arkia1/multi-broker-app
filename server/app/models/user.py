from pydantic import BaseModel
from pydantic.networks import EmailStr

# User registration model
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

# User response model (used when sending the user details back)
class UserResponse(BaseModel):
    username: str
    email: EmailStr

    class Config:
        orm_mode = True


