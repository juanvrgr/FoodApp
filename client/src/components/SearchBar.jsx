import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../actions";
import "../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


export default function SearchBar() {
const dispatch = useDispatch();
const [name, setName] = useState("");

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
};

function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
    setName("");
};

function handleKeyPress (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
        dispatch(getNameRecipe(name));
        setName("");
    }
};

return (
    <div className="searchBar">
        <input
        className="input"
        type="text"
        value={name}
        placeholder="Search recipe..."
        onChange={(e) => handleInputChange(e)}
        onKeyPress={handleKeyPress}
        />
        {/* <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">Search</button> */}
        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
            <FontAwesomeIcon icon={faSearch}/>
        </button>
    </div>
)
};