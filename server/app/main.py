from fastapi import FastAPI, Query, HTTPException, Depends
from app.services.news_services import fetch_financial_news
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow all origins (can be changed to specific origins like 'http://localhost:5173' for better security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

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
