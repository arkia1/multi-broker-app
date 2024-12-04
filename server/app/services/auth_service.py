from app.db import get_db
from pymongo.errors import DuplicateKeyError
from passlib.context import CryptContext
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from app.db import find_user_by_username
import os

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

uri = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(uri)
db = client["multi_broker_db"]  # Specify your database name

async def get_user_by_username(username: str):
    db_user = await find_user_by_username(username)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

async def create_user(username: str, email: str, password: str):
    """
    Create a new user and return the user data.
    """
    collection = db["users"]

    # Check if the username already exists
    existing_user = await collection.find_one({"username": username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash the password before saving
    hashed_password = pwd_context.hash(password)

    # Create the user document
    user_data = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    try:
        # Insert the user into the collection
        result = await collection.insert_one(user_data)
        # Return the user data including the inserted_id
        user_data["_id"] = str(result.inserted_id)  # Adding the inserted ID to the returned data
        return user_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during user creation: {str(e)}")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify that the plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)
