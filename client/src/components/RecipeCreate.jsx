import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/RecipeCreate.css";

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "Put a name for your recipe!");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "Put a summary for your recipe!");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
};

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      dispatch(getDiets());
    }, [dispatch]);

    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
      });

      function handleChange(e) {
        setInput((input) => ({
          ...input,
          [e.target.name]: e.target.value,
        }));
        setErrors(
          validate({
            ...input,
            [e.target.name]: e.target.value,
          })
        );
      };

      function handleSelectDiet(e) {
        setInput((input) => ({
          ...input,
          diets: [...input.diets, e.target.value],
        }));
        setErrors(
          validate({
            ...input,
            diets: [...input.diets, e.target.value],
          })
        );
      };

      function handleSubmit(e) {
        if (input.title && input.summary && input.image && input.diets.length > 0) {
          e.preventDefault();
          dispatch(postRecipe(input));
          alert("Recipe created succesfully!");
          setInput({
            title: "",
            summary: "",
            aggregateLikes: 0,
            healthScore: 0,
            analyzedInstructions: "",
            image: "",
            diets: [],
          });
          navigate("/home");
        } else {
          e.preventDefault();
          alert("You must complete every field to continue!");
        }
      };
    
      function handleDelete(e, d) {
        e.preventDefault();
        setInput({
          ...input,
          diets: input.diets.filter((diet) => diet !== d),
        });
      };
    
      return (
        <div className="create">
      <Link to="/home">
        <button className="buttonToHome">Go Back</button>
      </Link>
          <h1>Create your own Recipe!</h1>
          <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label>Recipe Title</label>
                <input
                className="inputCreate"
                placeholder="Complete here..."
                type="text"
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}
                />
                {errors.title && <p className="error">{errors.title}</p>}
              </div>
              <div>
                <label>Summary:</label>
                <input
                className="inputCreate"
                placeholder="Complete here..."
                type="text"
                value={input.summary}
                name="summary"
                onChange={(e) => handleChange(e)}
                />
                {errors.summary && <p className="error">{errors.summary}</p>}
              </div>
              <div>
                <label>Score:</label>
                <input
                className="inputCreate"
                type="text"
                value={input.aggregateLikes}
                name="aggregateLikes"
                onChange={(e) => handleChange(e)}
              />
              </div>
              <div>
              <label>Health Level:</label>
              <input
              className="inputCreate"
              type="text"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
              />
          </div>
            <div>
            <label className="labelInstr">Instructions:</label>
            <textarea
              type="text"
              className="instruction"
              placeholder="Complete here..."
              rows="5"
              value={input.analyzedInstructions}
              name="analyzedInstructions"
              onChange={(e) => handleChange(e)}
            />
            </div>
            <div>
            <label>Image:</label>
            <input
            className="inputCreate"
            type="text"
            placeholder="Example: https://..."
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
            </div>
            <div className="dietsCreate">
            <span >Type of Diet:</span>
            <select onChange={(e) => handleSelectDiet(e)}>
              {diets.map((d) => (
                <option value={d.name} key={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {input.diets.map((d, i) => (
              <ul key={i}>
                <li>{d}</li>
                <button onClick={(e) => handleDelete(e, d)}>X</button>
              </ul>
            ))}
            {errors.diets && <p className="error">{errors.diets}</p>}
          </div>
          <button type="submit" className="btnCreate">
            Create Recipe
          </button>
          </form>
        </div>
        </div>
      )
};