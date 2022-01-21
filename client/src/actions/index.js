import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const GET_TYPES_OF_DIET = "GET_TYPES_OF_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE_LIKES = "ORDER_BY_SCORE_LIKES";
export const GET_NAME_RECIPE = "GET_NAME_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DETAIL = "GET_DETAIL";
// export const FILTER_CREATED = "FILTER_CREATED";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
};

// CON .THEN
// export function getRecipes(){
//   return function(dispatch){
//            axios.get('http://localhost:3001/recipes')
//           .then((json) => {
//           return dispatch({
//               type: GET_RECIPES,
//               payload: json.data
//           })
//       }).catch((error) => {
//           console.log(error)
//       })
//   }
// }

export function getTypesOfDiet() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES_OF_DIET",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function filterByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
};

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
};

export function orderByScoreLikes(payload) {
  return {
    type: "ORDER_BY_SCORE_LIKES",
    payload,
  };
};

export function getNameRecipe(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/recipes?name=" + name
      );
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });
    } catch (error) {
      alert("This recipe doesn't exist");
    }
  };
};

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
};

// CON .THEN
// export function getDiets() {
//   return function (dispatch) {
//       try {
//           axios.get(`http://localhost:3001/types`)
//           .then(types => 
//                dispatch({
//               type: "GET_DIETS",
//               payload: types.data
//               })
//           )
//       } catch (error) {
//           console.log(error);
//       }
//   }
// }

export function postRecipe(payload) {
  return async function () {
    const json = await axios.post("http://localhost:3001/recipe", payload);
    return {
      type: "POST_RECIPE",
      json,
    };
  };
};

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      alert("The ID doesn't match with any recipe");
    }
  };
};

// export function filterCreated(payload){
//    return{
//        type: "FILTER_CREATED",
//        payload
//    }
// };