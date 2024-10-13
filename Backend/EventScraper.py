from bs4 import BeautifulSoup
import requests
import re
from pymongo import MongoClient
from pymongo.errors import PyMongoError

def event_grabber():

    # Scraping data from the website
    response = requests.get("https://mason360.gmu.edu/mobile_ws/v17/mobile_events_list?range=0&limit=&filter4_contains=OR&filter4_notcontains=OR&order=undefined&search_word=&&1728715900675")

    if response.status_code == 200:
        data = response.json()
        events = []

        for event in data:
            event_name = event.get("p3")  # eventName
            event_dates = event.get("p4")  # eventDates
            event_place = event.get("p6")
            event_url = event.get("p18")  # eventUrl
            event_tags = event.get("p22")  # tags the <p> with aria-labels

            if event_name != "False":
                # Clean up event data
                event_dates = re.sub("<p style='margin:0;'>", "", event_dates).replace("</p>", "").strip()
                event_dates = event_dates.replace(" &ndash; ", " - ").replace("20249", "2024")

                # Prepare the data for insertion into MongoDB
                formatted_event = {
                    "event_name": event_name,
                    "date": event_dates,
                    "location": event_place,
                    "url": event_url,
                    "tags" : event_tags,
                    # You can add more fields if needed
                }

                # Insert the data into the MongoDB collection
                try:
                    result = collection.insert_one(formatted_event)
                    print(f"Inserted event: {event_name} with ID: {result.inserted_id}")
                except PyMongoError as e:
                    print(f"An error occurred while inserting: {e}")

        print("Scraping and insertion completed.")
    else:
        print("Failed to connect to the website.")