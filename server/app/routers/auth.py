# from fastapi import APIRouter, HTTPException, Depends, status
# from pydantic import BaseModel
# from app.models.user import User, UserInDB
# from app.utils.hashing import hash_password, verify_password
# from app.db import get_db
# import os
# from server.app.utils.jwt import create_access_token
# from app.models.token import Token

# #Define the expiration time for the access token
# # ACCESS_TOKEN_EXPIRE_MINUTES = 30

# router = APIRouter()


# # ------------------------------------------------------- Registeration endpoit ----------------------------------------------------------------------------- #

# @router.post("/register", response_model=UserInDB)
# async def register(user: User , db=Depends(get_db)):
#     # Check if the user already exists
#     existing_user = db.users.find_one({"username": user.username})
#     if existing_user:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    
#     # Hash the password
#     hashed_password = hash_password(user.password)
#     user_in_db = UserInDB(**user.dict(), hashed_password=hashed_password)

#     # Insert the user into the database
#     db.users.insert_one(user_in_db.dict())
#     return user_in_db
# # --------------------------------------------------------------------------------------------------------------------------------------------------------------- #
# # ------------------------------------------------------- Login endpoint ------------------------------------------------------------------------------- #

# @router.post("/login", response_model=Token)
# async def login(user: User, db=Depends(get_db)):
#     # Check if the user exists
#     db_user = db.users.find_one({"username": user.username})
#     if not db_user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    
#     # Verify the password
#     if not verify_password(user.password, db_user["hashed_password"]):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    
#     # Create and return the access token
#     access_token = create_access_token(data={"sub": user.username})
#     return {"access_token": access_token, "token_type": "bearer"}