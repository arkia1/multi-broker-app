import pytest
import requests

BASE_URL = "http://localhost:8000/api"
LOGIN_URL = f"{BASE_URL}/login"
USERNAME = "Arkia"  # Replace with a valid username
PASSWORD = "123456"  # Replace with a valid password

@pytest.fixture(scope="session")
def token():
    response = requests.post(
        LOGIN_URL,
        json={"username": USERNAME, "password": PASSWORD},
        headers={"Content-Type": "application/json"}
    )
    assert response.status_code == 200
    data = response.json()
    return data["access_token"]

@pytest.fixture
def headers(token):
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

def test_add_to_watchlist(headers):
    response = requests.post(
        f"{BASE_URL}/watchlist",
        json={"asset": "BTC"},
        headers=headers
    )
    assert response.status_code == 200
    data = response.json()
    assert "BTC" in data["assets"]

def test_get_watchlist(headers):
    response = requests.get(f"{BASE_URL}/watchlist", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "assets" in data

def test_remove_from_watchlist(headers):
    response = requests.delete(f"{BASE_URL}/watchlist/BTC", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "BTC" not in data["assets"]