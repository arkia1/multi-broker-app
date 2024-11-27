import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration constants
API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = "https://newsapi.org/v2/everything"

if not API_KEY:
    raise ValueError("NEWS_API_KEY is not set in the .env file.")
