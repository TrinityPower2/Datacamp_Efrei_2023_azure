import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import home from "../img/home_white.png";
import music from "../img/music.png";
import "../styles/home.css";
import "../styles/select.css";

function Select() {
useEffect(() => {
  fetch("http://localhost:5000/select", {
    method: "POST" // Utilisez la méthode GET pour récupérer des données sans en envoyer
  })
    .then(function (response) {

      if (response.ok) {
        // Convert the response to JSON format
        return response.json();
      } else {
        throw new Error('Une erreur s\'est produite');
      }
    })
    .then(function (data) {
      // Mettez le tableau de données dans une variable d'état
      setFetchedData(data); // Assurez-vous d'avoir une variable d'état pour stocker les données
    })
    .catch(function (error) {
      console.error("Une erreur s'est produite :", error);
    });
    }, []);

// Assurez-vous d'avoir une variable d'état pour stocker les données
const [fetchedData, setFetchedData] = useState([]);

// Vous pouvez maintenant utiliser "fetchedData" dans votre composant


    console.log(fetchedData);

    const [selectedSongs, setSelectedSongs] = useState([]);
    const navigate = useNavigate();
    const songData = [
        {
            id: 1,
            name: 'Song 1',
            artist: 'Artist 1',
            image: music,
        },
        {
            id: 2,
            name: 'Song 2',
            artist: 'Artist 2',
            image: music,
        },
        {
            id: 3,
            name: 'Song 3',
            artist: 'Artist 3',
            image: music,
        },
        {
            id: 4,
            name: 'Song 4',
            artist: 'Artist 4',
            image: music,
        },
        {
            id: 5,
            name: 'Song 5',
            artist: 'Artist 5',
            image: music,
        },
        {
            id: 6,
            name: 'Song 6',
            artist: 'Artist 6',
            image: music,
        },
        {
            id: 7,
            name: 'Song 7',
            artist: 'Artist 7',
            image: music,
        },
        {
            id: 8,
            name: 'Song 8',
            artist: 'Artist 8',
            image: music,
        },
        {
            id: 9,
            name: 'Song 9',
            artist: 'Artist 9',
            image: music,
        },
        {
            id: 10,
            name: 'Song 10',
            artist: 'Artist 10',
            image: music,
        },
        {
            id: 11,
            name: 'Song 11',
            artist: 'Artist 11',
            image: music,
        },
        {
            id: 12,
            name: 'Song 12',
            artist: 'Artist 12',
            image: music,
        },
        {
            id: 13,
            name: 'Song 13',
            artist: 'Artist 13',
            image: music,
        },
        {
            id: 14,
            name: 'Song 14',
            artist: 'Artist 14',
            image: music,
        },
        {
            id: 15,
            name: 'Song 15',
            artist: 'Artist 15',
            image: music,
        },
        {
            id: 16,
            name: 'Song 16',
            artist: 'Artist 16',
            image: music,
        }
    ];


    const handleSongClick = (song) => {
        if (!selectedSongs.some(selectedSong => selectedSong.id === song.id)) {
            const updatedSelection = [...selectedSongs, song];
            setSelectedSongs(updatedSelection);
        }
    };
    const handleRemoveSong = (songId) => {
        const updatedSelection = selectedSongs.filter(song => song.id !== songId);
        setSelectedSongs(updatedSelection);
    };
    const handleLetTuneItClick = () => {
        console.log("selectedSongs:", selectedSongs);
        navigate("/display", { state: { selectedSongs } });
    };
  return (
    <div className="wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Link to={"/"}>
        <div id="home-container">
            <img id='home' src={home} alt="" />
        </div>
      </Link>
      <div id="title">
        TuneTeller
      </div>
      <div id='wrap'>
        <div id='selection'>
            <div id='selectxt'>Selection</div>
            <div id='songs-display'>
                {selectedSongs.map((song2) =>(
                    <div id='song2' key={song2.id}>
                        <img id="music" src={song2.image} alt="" />
                        <div id="song-details">
                            <p id="song-name2">{song2.name}</p>
                            <p id="artist-name2">{song2.artist}</p>
                        </div>
                        <button id='remove' onClick={() => handleRemoveSong(song2.id)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div id='allsongs'>
            <div id='alltxt'>Available songs</div>
            <div id='songs-container'>
            {songData.map((song) => (
                <div id="song" key={song.id} onClick={() => handleSongClick(song)}>
                    <img id="music" src={song.image} alt="" />
                    <div id="song-details">
                        <p id="song-name">{song.name}</p>
                        <p id="artist-name">{song.artist}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
      <Link to={"/display"}>
        <button id="launch" onClick={handleLetTuneItClick}>Let's tune it !!!</button>
      </Link>
    </div>
  );
}

export default Select;