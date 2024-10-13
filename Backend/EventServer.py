from flask import Flask, jsonify, request
from pymongo import MongoClient
import json
from flask import request
from OpenAi import EventAi

app = Flask(__name__)

with open('mongodb_credentials.json', 'r') as f:
    creds = json.load(f)

username = creds['username']
password = creds['password']
host = creds['host']
port = creds['port']
database_name = creds['database_name']

# Create the MongoDB URI and connect to the database
uri = f"mongodb://{username}:{password}@{host}:{port}/{database_name}"
client = MongoClient(uri)
db = client[database_name]
collection_name = db['events']  # Replace 'events' with your collection name
# Create a MongoDB connection string

connection_string = f"mongodb://{username}:{password}@{host}:{port}/admin"

# Create a MongoClient
client = MongoClient(connection_string)

# Access the event_data database and the specified collection
db = client[database_name]
collection = db[collection_name]

# delete collection
collection.delete_many({})

@app.route("/")
def personal_events():
    searchword = request.args.get('input', '')
    output = EventAi(searchword)
    return output