from function_song import *
import json
import ast

def is_song_in_list(songs_list, dico):
    for song in songs_list:
        if song['song'] == dico['Name'] and song['singer'] == dico['Artist']:
            return True
    return False


def increment_points(df, column_name, value):
    df['points'] += df[column_name].apply(lambda x: 1 if x == value and x != 'N/A' else 0)


def calculate_similarity(row, column_name, df_selected):
    points = 0
    if len(row[column_name][0]) != 0:
        if isinstance(row[column_name], list):
            for genre_list in df_selected[column_name]:
                points += sum(1 for genre in row[column_name] if genre in genre_list)
    return points


def compute_recommendations(selected_songs):
    # fetch song info from db
    ref = db.reference('/test')
    data = ref.get()
    # transform the string selected songs into a list
    list_selected_songs = json.loads(selected_songs)

    selected_songs_full = []
    for dico in data:
        if is_song_in_list(list_selected_songs, dico):
            selected_songs_full.append(dico)

    df_dataset = pd.DataFrame(data)

    # create the points column
    df_dataset['points'] = 0
    # list of attributes to compare
    df_cols = ['Artist', 'Album', 'Popularity', 'Nb contributors', 'Detected_Language', 'duration', 'listener',
               'playcount', 'date', "dating", "violence", "world life", "night time", "shake the audience",
               "family gospel", "romantic", "communication", "obscene", "music", "movement places",
               "light visual perceptions", "family spiritual", "like girls", "sadness", "feelings", "danceability",
               "loudness", "acousticness", "instrumentalness", "energy"]

    for song in selected_songs_full:
        for col in df_cols:
            increment_points(df_dataset, col, song[col])

    # manage genre lists
    df_selected = pd.DataFrame(selected_songs_full)
    df_dataset['genre_artist'] = df_dataset['genre_artist'].str.strip("[]").str.replace("'", "").str.split(', ')
    df_dataset['genre_song'] = df_dataset['genre_song'].str.strip("[]").str.replace("'", "").str.split(', ')

    df_dataset['points'] += df_dataset.apply(calculate_similarity, args=('genre_artist', df_selected), axis=1)
    df_dataset['points'] += df_dataset.apply(calculate_similarity, args=('genre_song', df_selected), axis=1)

    # order by nb Pts
    df_dataset.sort_values(by='points', ascending=False, inplace=True)

    # compute the list to return
    returned_list = []
    for index, song in df_dataset.iterrows():
        # Remove the songs originally in the selected songs
        if not is_song_in_list(list_selected_songs, song):
            returned_list.append({"id": index, "song": song['Name'], "singer": song['Artist']})
    print("Final list:")
    print(returned_list)
    return returned_list
