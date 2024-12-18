import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration constants
API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = "https://newsapi.org/v2/everything?q=finance OR forex OR crypto OR stocks OR trading&sortBy=publishedAt&language=en"



if not API_KEY:
    raise ValueError("NEWS_API_KEY is not set in the .env file.")


class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    MONGO_URI: str = os.getenv("MONGO_URI")  # Ensure you have this in your .env

settings = Settings()