import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe, setCurrentPage } from "../actions";
import "../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({setCurrentPage}) {
const dispatch = useDispatch();
const [name, setName] = useState("");

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
};

// function handleSubmit(e) {
//     e.preventDefault();
//     dispatch(getNameRecipe(name));
//     setName("");
// };

function handleKeyPress (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getNameRecipe(name));
        setName("");
    }
};

const handleClearInput = (e) => {
    e.preventDefault();
    setName("");
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
        {/*<button type="submit" onClick={(e) => handleSubmit(e)} className="btn">
            <FontAwesomeIcon icon={faSearch}/>
        </button>*/}
        {name.length === 0 ? (<button className="btnSearch"><FontAwesomeIcon icon={faSearch}/>
        </button>) : (<button type="button" onClick={(e) => handleClearInput(e)} className="btnClear">
            <FontAwesomeIcon icon={faTimes}/>
        </button>)}
    </div>
)
};