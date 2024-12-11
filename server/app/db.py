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

async def get_watchlist_by_user_id(user_id: str):
    db = get_db()
    collection = db["watchlists"]
    return await run_in_threadpool(collection.find_one, {"user_id": user_id})

async def add_asset_to_watchlist(user_id: str, asset: str):
    db = get_db()
    collection = db["watchlists"]
    watchlist = await get_watchlist_by_user_id(user_id)
    if watchlist:
        if asset not in watchlist["assets"]:
            watchlist["assets"].append(asset)
            await run_in_threadpool(collection.update_one, {"user_id": user_id}, {"$set": {"assets": watchlist["assets"]}})
    else:
        await run_in_threadpool(collection.insert_one, {"user_id": user_id, "assets": [asset]})
    return await get_watchlist_by_user_id(user_id)

async def remove_asset_from_watchlist(user_id: str, asset: str):
    db = get_db()
    collection = db["watchlists"]
    watchlist = await get_watchlist_by_user_id(user_id)
    if watchlist and asset in watchlist["assets"]:
        watchlist["assets"].remove(asset)
        await run_in_threadpool(collection.update_one, {"user_id": user_id}, {"$set": {"assets": watchlist["assets"]}})
    return await get_watchlist_by_user_id(user_id)