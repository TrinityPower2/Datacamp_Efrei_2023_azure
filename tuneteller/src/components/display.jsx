import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import home from "../img/home_white.png";
import "../styles/home.css";
import "../styles/display.css";
import music from "../img/music.png";



function Display() {
    const listeDeChansons = sessionStorage.getItem('selected_songs');
    console.log(listeDeChansons);
    useEffect(() => {
        fetch('http://localhost:5000/display_recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({maVariable: listeDeChansons}),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Réponse du serveur non valide");
                }
            })
            .then((data) => {
                setSongData(data.recommendation);
            })
            .catch((error) => {
                console.error("Erreur lors de la requête :", error);
            });
    });

    const [songData, setSongData] = useState([]);
    const [numDisplayed, setNumDisplayed] = useState(10);

    const location = useLocation();

    const handleNumDisplayedChange = (event) => {
        setNumDisplayed(parseInt(event.target.value));
    };

  return (
    <div className="wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Link to={"/"} id='link'>
        <img id='home' src={home} alt="" />
      </Link>
      <div id="title">
        {location.state}
      </div>
      <div id='wrap'>
        <div id='recommendation'>
            <div>
                <label htmlFor="numDisplayed" id="contentDisplayed">Number of Songs to Display: </label>
                <select id="numDisplayed" name="numDisplayed" value={numDisplayed} onChange={handleNumDisplayedChange}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div id='recotxt'>Recommendation</div>
            <div id='reco-container'>
            {songData.slice(0, numDisplayed).map((tsong) => (
                <div id="song" key={tsong.id}>
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
    </div>
  );
}

export default Display;