import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_register_user():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.post(
            "/api/register",
            json={"username": "testuser", "email": "testuser@example.com", "password": "testpassword"}
        )
    assert response.status_code == 201
    assert response.json()["username"] == "testuser"
    assert response.json()["email"] == "testuser@example.com"

@pytest.mark.asyncio
async def test_register_existing_user():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        # Attempting to register the same user again
        response = await client.post(
            "/api/register",
            json={"username": "testuser", "email": "testuser@example.com", "password": "testpassword"}
        )
    assert response.status_code == 400
    assert response.json()["detail"] == "Username already exists"

@pytest.mark.asyncio
async def test_login_user():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.post(
            "/api/login",
            data={"username": "testuser", "password": "testpassword"}
        )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

@pytest.mark.asyncio
async def test_login_invalid_user():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.post(
            "/api/login",
            data={"username": "invaliduser", "password": "wrongpassword"}
        )
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
