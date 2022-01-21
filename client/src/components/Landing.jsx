import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
    return (
      <div className="landing">
        <h1>RECIPEX</h1>
        <h2>Search and create your desired recipes!</h2>
        <div>
          <Link to="/home" className="btnLan">
            <button>LET'S COOK!</button>
          </Link>
        </div>
      </div>
    );
  };