import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "Choose at least one diet")
    : (errors.diets = "");
  if (!input.img.includes("https://") && !input.img.includes("http://")) {
    errors.img = "This isn't a valid image address";
  } else {
    errors.img = "";
  }
  return errors;
}


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
        img: "",
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
      }

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
      }

      function handleSubmit(e) {
        if (input.title && input.summary && input.img && input.diets.length > 0) {
          e.preventDefault();
          dispatch(postRecipe(input));
          alert("Recipe succesfully Created!!");
          setInput({
            title: "",
            summary: "",
            aggregateLikes: 0,
            healthScore: 0,
            analyzedInstructions: "",
            img: "",
            diets: [],
          });
          navigate("/home");
        } else {
          e.preventDefault();
          alert("You must complete every field!!");
        }
      }
    
      function handleDelete(e, d) {
        e.preventDefault();
        setInput({
          ...input,
          diets: input.diets.filter((diet) => diet !== d),
        });
      }
    

      return (
        <div>
          <Link to="/home"><button>Go back</button></Link>
          <h1>Create your own Recipe here:</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label>Recipe Name</label>
                <input
                type="text"
                placeholder="Complete here..."
                value={input.title}
                name="title"
                onChange={(e) => handleChange(e)}
                />
                {errors.title && <p>{errors.title}</p>}
              </div>
              <div>
                <label>Summary:</label>
                <input
                type="text"
                placeholder="Complete here..."
                value={input.summary}
                name="summary"
                onChange={(e) => handleChange(e)}
                />
                {errors.summary && <p>{errors.summary}</p>}
              </div>
              <div>
                <label>Score:</label>
                <input
                type="text"
                value={input.aggregateLikes}
                name="aggregateLikes"
                onChange={(e) => handleChange(e)}
              />
              </div>
              <div>
              <label>Health Level:</label>
              <input
              type="text"
              value={input.healthScore}
              name="healthScore"
              onChange={(e) => handleChange(e)}
              />
          </div>
            <div>
            <label >Instructions:</label>
            <textarea
              type="text"
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
              type="text"
              placeholder="Example: https://..."
              value={input.img}
              name="img"
              onChange={(e) => handleChange(e)}
            />
            {errors.img && <p>{errors.img}</p>}
            </div>
            <div>
            <span>Type of Diet:</span>
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
                <button onClick={(e) => handleDelete(e, d)}>x</button>
              </ul>
            ))}
            {errors.diets && <p>{errors.diets}</p>}
          </div>
          <button type="submit">
            Create Recipe
          </button>
          </form>
        </div>
      )
}