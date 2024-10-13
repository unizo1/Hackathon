import os
from pymongo import MongoClient
from dotenv import load_dotenv
from openai import OpenAI
from EventScraper import event_grabber
import json

def EventAi(user_filter):
    load_dotenv("OAKEY.env")
    API_KEY = os.getenv("OAKEY")
    client = OpenAI(
        # This is the default and can be omitted
        api_key = API_KEY
    )

    event_grabber()

    # Load MongoDB credentials from a JSON file
    with open('mongo_credentials.json', 'r') as f:
        creds = json.load(f)


    username = creds['username']
    password = creds['password']
    host = creds['host']
    port = creds['port']
    database_name = creds['database_name']


    # Create the MongoDB URI and connect to the database
    uri = f"mongodb://{username}:{password}@{host}:{port}/{database_name}"
    client = MongoClient(uri)


    # Access the event_data collection
    collection = client[database_name]['event_data']


    # Retrieve all documents in the collection
    documents = collection.find({})


    # Convert all documents to a string
    all_docs_str = ""
    for doc in documents:
        all_docs_str += str(doc) + "\n"  # Concatenate each document as a string, separated by newlines


    # Optionally, delete all documents in the collection
    collection.delete_many({})

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""
                Given the following list of events read each one throughly, 
                Only show the top 3 events that match this criteria 
                User input is the most important thing to consider compare to the title and tags of events, 
                make assumptions based off the titles so that you are an expert at each topic example: if they like indoor don't do something thats ususally outdoor
                and jsonify the output: {user_filter}\n{all_docs_str}""",
            }
        ],
        model="gpt-3.5-turbo",
    )
    return chat_completion.choices[0].message.content