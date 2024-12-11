import httpx
from app.config import API_KEY, NEWS_API_URL

async def fetch_financial_news(query: str = "finance", page: int = 1, page_size: int = 10, filters: dict = None):
    """
    Fetch financial news with optional filters.
    Args:
        query: The search term (default is 'finance').
        page: Pagination page number.
        page_size: Number of results per page.
        filters: Optional filters (e.g., specific domains, language, or date range).
    Returns:
        JSON response from NewsAPI.
    """
    params = {
        "q": query,
        "apiKey": API_KEY,
        "page": page,
        "pageSize": page_size,
    }

    # Apply additional filters
    if filters:
        params.update(filters)

    async with httpx.AsyncClient() as client:
        response = await client.get(NEWS_API_URL, params=params)
        response.raise_for_status()  # Will raise an exception if the status code is not 200
        return response.json()

    