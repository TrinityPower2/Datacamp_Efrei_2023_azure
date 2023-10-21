from firebase import firebase


firebase_url = "https://tuneteller-29e7c-default-rtdb.europe-west1.firebasedatabase.app/"
firebase_db = firebase.FirebaseApplication(firebase_url, None)

# Récupérez les données Firebase à partir de l'emplacement souhaité




def song_list():
    data = firebase_db.get("/test", None)

    list = []
    for i in range(len(data)):
        d = {}
        d['id']=i
        d['singer']=data[i]['Artist']
        d['song']=data[i]['Name']

        list.append(d)
    return list
