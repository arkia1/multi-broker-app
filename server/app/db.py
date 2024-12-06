from fastapi import BackgroundTasks
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from fastapi.concurrency import run_in_threadpool

load_dotenv()

uri = os.getenv("MONGO_URI")

if not uri:
    raise ValueError("MONGO_URI is not set in the .env file.")

client = MongoClient(uri, server_api=ServerApi('1'))

print("Pinging MongoDB connection...", end="")

try:
    client.admin.command('ping')
    print("Connection successful.")
except:
    print("Connection failed.")

def get_db(database_name: str = "multi_broker_db"):
    """
    Returns the MongoDB database instance.
    """
    return client[database_name]

async def find_user_by_username(username: str):
    db = get_db()
    collection = db["users"]
    return await run_in_threadpool(collection.find_one, {"username": username})


