from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
import httpx 
import os
from dotenv import load_dotenv

from app.db import get_db
from app.services.news_services import fetch_financial_news
from app.services.auth_service import get_user_by_username, create_user, verify_password
from app.schemas.user import UserRegisterRequest, UserLoginRequest
from app.utils.jwt import create_access_token, verify_token  # JWT token utility functions


app = FastAPI()


load_dotenv()

#----------------------------------------------------------------------------------------------------------------------------------------------- #

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

#-------------------------------------------------------------------- middlewares --------------------------------------------------------------------------- #

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow all origins (can be changed to specific origins like 'http://localhost:5173' for better security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
#-------------------------------------------------------------------- root ------------------------------------------------------------------------------- #
@app.get("/api/")
async def root():
    return {"message": "Welcome to the Multi-Broker App!"}


#-------------------------------------------------------------------- Market_News --------------------------------------------------------------------------- #


@app.get("/api/news")
async def get_financial_news(
    q: str = Query(default="finance", description="Search query for news"),
    page: int = Query(default=1, ge=1, description="Page number"),
    page_size: int = Query(default=10, ge=1, le=100, description="Number of results per page"),
    language: str = Query(default=None, description="Language code (e.g., 'en' for English)"),
    sort_by: str = Query(default=None, description="Sort by relevance, popularity, or publishedAt"),
    from_date: str = Query(default=None, description="Start date (YYYY-MM-DD)"),
    to_date: str = Query(default=None, description="End date (YYYY-MM-DD)"),
):
    """
    API endpoint to fetch filtered financial news.
    """
    filters = {}
    if language:
        filters["language"] = language
    if sort_by:
        filters["sortBy"] = sort_by
    if from_date:
        filters["from"] = from_date
    if to_date:
        filters["to"] = to_date

    try:
        # Fetch the financial news using the service
        news_data = await fetch_financial_news(query=q, page=page, page_size=page_size, filters=filters)
        return news_data
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


#-------------------------------------------------------------------- database ping --------------------------------------------------------------------------- #

@app.get("/api/ping")
def ping():
    db = get_db()
    # Use the database instance to query collections, etc.
    # Example of fetching data from a collection
    collection = db["users"]
    user = collection.find_one({"username": "user1"})
    return {"status": "success", "user": user}

#------------------------------------------------------------- authentication and protected routes -------------------------------------------------------- #

# Register a new user
@app.post("/api/register")
async def register_user(request: UserRegisterRequest):
    """
    Register a new user by providing username, email, and password.
    """
    try:
        user = await create_user(request.username, request.email, request.password)
        return {"message": "User created successfully", "user": {"username": user["username"], "email": user["email"]}}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        # Log the error to understand the issue
        print(f"Error during registration: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
# Login user and return JWT token
@app.post("/api/login")
async def login_user(request: UserLoginRequest):
    """
    Login user with username and password and return JWT token.
    """
    user = await get_user_by_username(request.username)
    
    if not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate JWT token
    token = create_access_token(data={"sub": request.username})
    
    return {"access_token": token, "token_type": "bearer"}

# Protected Route Example - User Profile
@app.get("/api/profile")
async def get_user_profile(token: str = Depends(oauth2_scheme)):
    """
    A protected route that requires a valid JWT token to access.
    """
    try:
        payload = verify_token(token)
        username = payload.get("sub")
        
        # Fetch user from DB using the username (payload["sub"])
        user = await get_user_by_username(username)
        return {"username": user["username"], "email": user["email"]}
    
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
    

# ---------------------------------------------------------- Blogs ----------------------------------------------------------------- #

