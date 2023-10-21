import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import home from "../img/home_white.png";
import "../styles/home.css";
import "../styles/display.css";

function Display() {
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