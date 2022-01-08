import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
    return (
      <div className="landing">
        const element = <h1 style={{ color: 'red' }}>RECIPEX</h1>
        const element2 = <h2 style={{ color: 'red' }}>Here you can search for your favorite recipes or create your own!</h2>
        <div>
          <Link to="/home">
            <button>LET'S COOK!</button>
          </Link>
        </div>
        <img
          src="https://i.pinimg.com/originals/8b/b3/87/8bb387ee878eddeb23baea344d4e13af.gif"
          alt=""
        />
      </div>
    );
  }