import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_news():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.get("/api/news?q=finance&page=1&page_size=5")
    assert response.status_code == 200
    assert "articles" in response.json()
    assert len(response.json()["articles"]) <= 5

@pytest.mark.asyncio
async def test_protected_route_without_token():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.get("/api/ping")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"

@pytest.mark.asyncio
async def test_protected_route_with_token():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        # Login to get token
        login_response = await client.post(
            "/api/login",
            data={"username": "testuser", "password": "testpassword"}
        )
        token = login_response.json()["access_token"]

        # Access the protected route
        headers = {"Authorization": f"Bearer {token}"}
        response = await client.get("/api/ping", headers=headers)
    assert response.status_code == 200
    assert response.json()["status"] == "success"
