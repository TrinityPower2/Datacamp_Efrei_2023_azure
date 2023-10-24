import firebase_admin
import pandas as pd
from firebase_admin import credentials
from firebase_admin import db
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from function_song import song_list
import json

cred = credentials.Certificate("../tuneteller-29e7c-firebase-adminsdk-9ghi0-c515cb5c65.json")
# cred = credentials.Certificate("D:\\Project\\M1\\Datacamp_Efrei_2023\\tuneteller-29e7c-firebase-adminsdk-9ghi0-c515cb5c65.json")
"""firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tuneteller-29e7c-default-rtdb.europe-west1.firebasedatabase.app/'
})"""

app = Flask(__name__)
CORS(app)



@app.route('/')  # Page d'accueil
def home():
    return "hello"


@app.route('/select', methods=['POST'])
def select():
    infos = song_list()
    print(infos)
    return json.dumps({'variable': infos})


@app.route('/display_recommendation', methods=['POST'])
def display_recommendation():
    ma_variable = request.json.get('maVariable')
    print(ma_variable)
    return jsonify({'recommendation': ma_variable})


if __name__ == "__main__":
    app.run(debug=True)
