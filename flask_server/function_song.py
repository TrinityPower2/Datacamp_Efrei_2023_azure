import numpy as np
import requests
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from langdetect import detect
import re
import pandas as pd

firebase_url = "https://tuneteller-29e7c-default-rtdb.europe-west1.firebasedatabase.app/"
firebase_db = firebase.FirebaseApplication(firebase_url, None)

cred = credentials.Certificate('../tuneteller-29e7c-firebase-adminsdk-9ghi0-c515cb5c65.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tuneteller-29e7c-default-rtdb.europe-west1.firebasedatabase.app/'})


def song_list():
    ref = db.reference('/test')
    data = ref.get()


    list = []
    for i in range(len(data)):
        d = {}
        d['id'] = i
        d['singer'] = data[i]['Artist']
        d['song'] = data[i]['Name']

        list.append(d)
    return list




def get_lyrics(artist, song_name):
    url = f"http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist={artist}&song={song_name}"

    response = requests.get(url)
    response_text = response.text

    if response.status_code == 200:
        lyric_match = re.search(r'<Lyric>(.*?)</Lyric>', response_text, re.DOTALL)

        if lyric_match:
            lyric_content = lyric_match.group(1)
            return (lyric_content)
        else:
            print("Balise <Lyric> introuvable.")
            return ' '


def song_infos(artist_name, song_name):
    genres_musicaux = [
        "rock",
        "pop",
        "hip-hop",
        "rap",
        "country",
        "blues",
        "jazz",
        "classical",
        "electronic",
        "dance",
        "reggae",
        "r&b",
        "folk",
        "metal",
        "punk",
        "alternative",
        "indie",
        "soul",
        "funk",
        "disco",
        "gospel",
        "electronic dance music (edm)",
        "techno",
        "house",
        "trance",
        "dubstep",
        "ska",
        "classical",
        "opera",
        "world",
        "k-pop",
        "latin",
        "raggae",
        "heavy metal",
        "singer-songwriter",
        "rap rock",
        "country pop",
        "jazz fusion",
        "electropop",
        "acoustic",
        "pop rock",
        "rap metal",
        "progressive rock",
        "classical crossover",
    ]

    api_key = 'fbd866cc9dd08da54a1e4ed4f6ff7896'

    url = f"http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key={api_key}&artist={artist_name}&track={song_name}&format=json"

    artist_info_url = f"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artist_name}&api_key={api_key}&format=json"
    response_artist = requests.get(artist_info_url)

    response = requests.get(url)
    data = response.json()

    artist_data = response_artist.json()
    d = {}
    tags_artist = {}
    tags_song = {}
    d['Artist'] = artist_name
    d['Name'] = song_name
    d['popularity'] = 0
    d['Nb contributors'] = 0

    # Vérifiez si la clé 'track' est dans la réponse (pour gérer les erreurs)
    if 'track' in data:

        track_data = data['track']
        print(track_data)
        duration = int(track_data['duration']) / 1000
        minutes = duration // 60
        if duration % 60 >= 30:
            minutes += 1

        listener = track_data['listeners']
        playcount = track_data['playcount']

        # Vérifiez si 'wiki' est présent dans les données (pour éviter les erreurs)
        if 'wiki' in track_data:
            published = track_data['wiki'].get('published', 'N/A')
        else:
            published = 'N/A'

        track_tags = data.get("track", {}).get("toptags", {}).get("tag", [])
        artist_tags = artist_data.get("artist", {}).get("tags", {}).get("tag", [])

        tags_song = [tag["name"] for tag in track_tags if tag["name"] in genres_musicaux]
        tags_artist = [tag["name"] for tag in artist_tags if tag["name"] in genres_musicaux]
        d['genre_artist'] = tags_artist
        d['genre_song'] = tags_song
        d['duration'] = minutes
        d['listener'] = listener
        d['playcount'] = playcount
        d['date'] = published
    else:
        d['genre_artist'] = 'N/A'
        d['genre_song'] = 'N/A'
        d['duration'] = 0
        d['listener'] = 0
        d['playcount'] = 0
        d['date'] = 'N/A'
    return d



def add_music():
    ref = db.reference()

    # Specify the artist and album you want to query
    artist_name = "Michael Jackson"
    song_name = "Thriller"

    # Query the database to find songs by the specified artist and album
    results = ref.child("test").order_by_child("Artist").equal_to(artist_name).get()
    cpt = 0
    # Iterate through the results and filter by album
    for key, value in results.items():
        if value["Name"] == song_name:
            print(value)
            cpt += 1
    if cpt == 0:
        lyrics = get_lyrics(artist_name, song_name)
        if lyrics != ' ':
            lang = detect(lyrics)
        else:
            lang = ' '
        df = song_infos(artist_name, song_name)
        df['lang'] = lang
        df['Lyrics'] = lyrics
        ref = db.reference('test')

        if df['date'] != 'N/A':
            date_timestamp = df['date']
            pattern = r'\d{4}'  # Recherche de 4 chiffres consécutifs
            match = re.search(pattern, df['date'])
            if match:
                year = int(match.group())  # Convertir la chaîne en entier
                decade = (year // 10) * 10  # Effectuer l'opération avec un entier
                df['date'] = decade

        data = ref.get()
        if isinstance(data, list):
            data = {str(i): value for i, value in enumerate(data)}
        max_id = max(int(k) for k in data.keys()) if data else 0
        print(max_id)

        print(df)
        ref.child(str(max_id+1)).set(df)
