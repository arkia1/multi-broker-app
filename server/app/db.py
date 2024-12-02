from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Fetch the Mongo URI from the environment variables
uri = os.getenv("MONGO_URI")

# Raise an error if the URI is not set
if not uri:
    raise ValueError("MONGO_URI is not set in the .env file.")

# Create a new client and connect to the server with MongoDB Atlas
client = MongoClient(uri, server_api=ServerApi('1'))

# Ping the server to check if the connection is successful
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

# Return the database instance to be used in the application
def get_db(database_name: str = "multi_broker_db"):
    """
    Returns the MongoDB database instance.

    Parameters:
    - database_name (str): The name of the database to access (default: "multi_broker_db").
    
    Returns:
    - Database instance.
    """
    return client[database_name]
