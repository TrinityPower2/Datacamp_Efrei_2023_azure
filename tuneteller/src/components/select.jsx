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
      setSongData(data.variable);
    })
    .catch(function (error) {
      console.error("Une erreur s'est produite :", error);
    });
    }, []);

// Assurez-vous d'avoir une variable d'état pour stocker les données
const [fetchedData, setFetchedData] = useState([]);

// Vous pouvez maintenant utiliser "fetchedData" dans votre composant


    console.log(fetchedData.variable);

    const [selectedSongs, setSelectedSongs] = useState([]);
    const navigate = useNavigate();
    const [songData, setSongData] = useState([]);


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
                        <img id="music" src={music} alt="" />
                        <div id="song-details">
                            <p id="song-name2">{song2.song}</p>
                            <p id="artist-name2">{song2.singer}</p>
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
            {songData.map((tsong) => (
                <div id="song" key={tsong.id} onClick={() => handleSongClick(tsong)}>
                    <img id="music" src={music} alt="" />
                    <div id="song-details">
                        <p id="song-name">{tsong.song}</p>
                        <p id="artist-name">{tsong.singer}</p>
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