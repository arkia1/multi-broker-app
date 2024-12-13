import pytest
from httpx import AsyncClient
from app.main import app


#------------------------------------------------------------ Register User ------------------------------------------------------------- #

@pytest.mark.asyncio
async def test_register_user():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as client:
        response = await client.post(
            "/api/register",
            json={"username": "BBBBB", "email": "BBBBB@example.com", "password": "testpassword"}
        )
    assert response.status_code == 200 or 201

@pytest.mark.asyncio
async def test_register_existing_user():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as client:
        # Attempting to register the same user again
        response = await client.post(
            "/api/register",
            json={"username": "BBBBB", "email": "BBBBB@example.com", "password": "testpassword"}
        )
    assert response.status_code == 400
    assert response.json()["detail"] == "Username already exists"


#------------------------------------------------------------ Login User ------------------------------------------------------------- #

@pytest.mark.asyncio
async def test_login_user():
    async with AsyncClient(app=app, base_url="http://localhost:8000") as client:
        # Ensure the data is sent as JSON
        response = await client.post(
            "/api/login",
            json={"username": "testuser", "password": "testpassword"}  # Send JSON
        )
    
    # Assert the response status code is 200 OK
    assert response.status_code == 200
    
    # Assert the response contains the access token and token type
    response_json = response.json()
    assert "access_token" in response_json
    assert response_json["token_type"] == "bearer"
    print(response.text)  # This will print the error message returned by FastAPI, if any


@pytest.mark.asyncio
async def test_login_invalid_user():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        response = await client.post(
            "/api/login",
            data={"username": "invaliduser", "password": "wrongpassword"}
        )
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
