import React from "react";
import "../styles/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Card({ title, image, diets, vegetarian, score }) {
  return (
    <div className="cardComp">
      <h3>{title}</h3>
      <img
        src={image}
        alt="Img recipe not found"
        width="150px"
        height="150px"
      />
      <h5 className="typeOfDiet">Type of Diet:</h5>
      <h5 className="diets">
        {diets}
        {vegetarian}
      </h5>
      <h5 className="hearth"><FontAwesomeIcon icon={faHeart}/></h5>
      <h5 className="score">
        {score}
      </h5>
    </div>
  );
}