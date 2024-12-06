import pytest
from httpx import AsyncClient
from app.main import app
import os

@pytest.mark.asyncio
async def test_image_upload():
    async with AsyncClient(app=app, base_url="http://testserver") as client:
        # Login to get token
        login_response = await client.post(
            "/api/login",
            json={"username": "testuser", "password": "testpassword"}
        )
        token = login_response.json()["access_token"]

        # Path to a sample image file
        image_path = "test/sample_image.jpg"
        
        # Ensure the image file exists
        assert os.path.exists(image_path), "Sample image file does not exist"
        
        with open(image_path, "rb") as image_file:
            response = await client.put(
                "/api/profile",
                headers={"Authorization": f"Bearer {token}"},
                files={"file": ("sample_image.jpg", image_file, "image/jpeg")},
                data={"email": "newemail@example.com"}
            )
        
        assert response.status_code == 200
        response_data = response.json()
        assert "url_to_image" in response_data
        assert response_data["url_to_image"].startswith("http")