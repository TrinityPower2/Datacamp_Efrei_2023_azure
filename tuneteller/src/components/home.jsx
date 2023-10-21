import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logoEfrei from "../img/logo_efrei2.png";
import simple from "../img/simple.png";
import rapide from "../img/rapide.png";
import efficace from "../img/efficace.png";
import "../styles/home.css";

function Home() {
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("navtext");

  const toggleBar = () => {
    if (isBarOpen) {
      closebar();
    } else {
      openbar();
    }
    setIsBarOpen(!isBarOpen);
  };

  function openbar(e) {
    const barElement = document.getElementById('bar');
    const navBarElement = document.getElementById('navbar');
    barElement.classList.add('active');
    navBarElement.classList.add('active');
  }

  function closebar() {
    const barElement = document.getElementById('bar');
    const navBarElement = document.getElementById('navbar');
    barElement.classList.remove('active');
    navBarElement.classList.remove('active');
  }

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="wrapper">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title">
        TuneTeller
      </div>
      <div id="slogan">
        "Let the Music Tell Your Tune"
      </div>
      <Link to={"/select"}>
        <button id="test">What's your tune ?</button>
      </Link>
      <div className='sidebar'>
          <button id="bar" onClick={toggleBar}></button>
      </div>
      <div id='navbar'>
        <div id='navwrap'>
          <div id='navmenu'>
            <button id='menutxt' onClick={() => handleContentChange("navmenu")}>Guide</button>
          </div>
          <div id='navmenu2'>
            <button id='menutxt2' onClick={() => handleContentChange("navmenu2")}>Advantages</button>
          </div>
          <div id='navmenu3'>
            <button id='menutxt3' onClick={() => handleContentChange("navmenu3")}>Credits</button>
          </div>
          <div>
          {selectedContent === "navmenu" && (
            <div id='navtext'>The use of our service is very simple. You just have to enter
              a song or select a song of your choice. With this simple manipulation, 
              we will be able to return a few songs that you will be most likeky to love.
            </div>
          )}
          {selectedContent === "navmenu2" && (
            <div>
              <div id='wrap_img'>
                <img id='img1' src={simple} alt="" />
                <img id='img2' src={rapide} alt="" />
                <img id='img3' src={efficace} alt="" />
              </div>
              <div id='navtext2'>
                You always wondered what kind of tune you would be into.
                Don't worry anymore, TuneTeller has been made for you.
                TuneTeller is an API service that will you help you search 
                for new musics which you will certainly like. Our service 
                will propose different songs depending on your own music taste.
              </div>
            </div>
          )}
          {selectedContent === "navmenu3" && (
            <div>
              <div id='navtext3'>Data Camp Project</div>
              <div id='navtext4'>Team Members: Jean- Baptiste CAPELLA (BIA1), Kevin OP (BIA2), Médéric PENIGUEL (DAI)</div>
              <img id='logo' src={logoEfrei} alt="" />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;