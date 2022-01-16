import React from "react";



export default function Card({ title, image, diets, vegetarian, score }) {
    return (
        <div>
            <h3>{title}</h3>
            <img src={image} alt="img not found"/>
            <h5>Type of Diet:</h5>
            <h5>
        {diets}
        {vegetarian}
      </h5>
      {/* <h5 className="typeOfD">Score:</h5>
      <h5 className="diets">
        
        {score}
      </h5> */}
        </div>
    )
}