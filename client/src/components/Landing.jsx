import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
    return (
      <div className="landing">
        <h1>RECIPEX</h1>
        <h2>Here you can search for your favorite recipes or create your own!</h2>
        <div>
          <Link to="/home" className="btnLan">
            <button>LET'S COOK!</button>
          </Link>
        </div>
        {/* <img
          src="https://i.giphy.com/media/STmold2zrhCaQ/giphy.gif"
          alt=""
        /> */}
      </div>
    );
  }