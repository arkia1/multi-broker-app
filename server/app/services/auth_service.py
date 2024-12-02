from app.db import get_db
from pymongo.errors import DuplicateKeyError
from passlib.context import CryptContext
from fastapi import HTTPException

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(username: str):
    """
    Fetch a user from the database by their username.
    """
    db = get_db()
    collection = db["users"]
    user = collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def create_user(username: str, email: str, password: str):
    """
    Create a new user in the database with a hashed password.
    """
    db = get_db()
    collection = db["users"]

    # Check if the username already exists
    existing_user = collection.find_one({"username": username})
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
        result = collection.insert_one(user_data)
        return {"username": username, "email": email, "id": str(result.inserted_id)}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Username already exists")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify that the plain password matches the hashed password.
    """
    return pwd_context.verify(plain_password, hashed_password)
