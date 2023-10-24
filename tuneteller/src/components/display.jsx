import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import home from "../img/home_white.png";
import "../styles/home.css";
import "../styles/display.css";



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
                console.log(data.recommendation);
            })
            .catch((error) => {
                console.error("Erreur lors de la requête :", error);
            });
    });



    const location = useLocation();
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
            <div id='recotxt'>Recommendation</div>
        </div>
      </div>
    </div>
  );
}

export default Display;