from flask import Flask, request
from OpenAi import EventAi

app = Flask(__name__)

@app.route("/")
def personal_events():
    searchword = request.args.get('input', '')
    output = EventAi(searchword)
    return output