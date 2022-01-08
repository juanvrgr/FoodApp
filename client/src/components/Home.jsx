import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRecipes,
    filterByDiet,
    getTypesOfDiet,
    orderByName,
    orderByScoreLikes,
    // filterCreated
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";

export default function Home() {
const dispatch = useDispatch(); // DESPACHA LAS ACCIONES
const allRecipes = useSelector((state) => state.recipes); 
const diets = useSelector((state) => state.diets);

//Paginate:
const [currentPage, setCurrentPage] = useState(1);
const [recipesPerPage, setRecipesPerPage] = useState(9);
const indexOfLastRecipe = currentPage * recipesPerPage; // = 9
const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 
const currentRecipes = allRecipes.slice( // Dividimos el array que contiene el state
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const [orderName, setOrderName] = useState("");
const [orderLike, setOrderLike] = useState("");


function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
}

function handleSelectTypeOfDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
}

function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
}

function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScoreLikes(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);
}

// function handleFilterCreated(e){
//     // e.preventDefault();
//     dispatch(filterCreated(e.target.value))
// }


useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]); // DESPACHO LA ACCION... PODRIA HACERSE CON mapStateToProps, mapStateToProps
// TRY [] IN CASE OF ERROR

useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

return (
    <div>
        <Link to="/recipe">Create recipe!</Link>
        <h1>THE LAND OF RECIPES</h1>
        <SearchBar />
        <button onClick={e=> {handleClick(e)}}>Show recipes</button>
        <div>
            <select onChange={(n) => handleSelectByName(n)}>
            <option value="default">All</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            </select>
            <select onChange={(s) => handleSelectByScore(s)}>
                <option value="All">All</option>
                <option value="Asc">Highest Score</option>
                <option value="Desc">Lowest Score</option>
            </select>
            <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All Diets</option>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {/* <select onChange={e => handleFilterCreated(e)}>
                <option value= 'All'>Todos</option>
                <option value= 'created'>Creados</option>
                
            </select> */}
            </div>
            <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length} // Necesito un valor NUMERICO
          paginate={paginate}
        />
            {
                currentRecipes?.map(el => {
                    return(
                        <fragment >
                            <Link to={"/home/" + el.id}>
                               <Card title={el.title} image={el.image} diets={el.diets} vegetarian={el.vegetarian} score={el.score}/>
                            </Link>
                        </fragment>
                    );
                 })
            }
    </div>
)
}

