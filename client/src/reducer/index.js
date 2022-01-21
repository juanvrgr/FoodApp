import {
  GET_RECIPES,
  FILTER_BY_DIET,
  GET_TYPES_OF_DIET,
  ORDER_BY_NAME,
  ORDER_BY_SCORE_LIKES,
  GET_NAME_RECIPE,
  GET_DIETS,
  POST_RECIPE,
  GET_DETAIL,
} from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
};

function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_RECIPES:
        return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

      case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };

      case FILTER_BY_DIET:
      let allRecipes = state.allRecipes;
      const recipesApi = allRecipes.filter((r) => !r.createdInDb);
      const filteredRecipesApi = recipesApi.filter((r) =>
        r.diets.includes(action.payload.toString().toLowerCase()));
      const recipeDb = allRecipes.filter((r) => r.createdInDb);
      const filteredRecipeDb = recipeDb.filter(
        (r) => r.Diets.name === action.payload
      );
      const filtered = filteredRecipeDb.concat(filteredRecipesApi);
      const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
      const vegetarianDb = recipeDb.filter(
        (r) => r.Diets.name === "vegetarian"
      );
      const vegetarian = vegetarianDb.concat(vegetarianApi);
      const ternario = action.payload === "vegetarian" ? vegetarian : filtered;
      return {
        ...state,
        recipes: action.payload === "default" ? allRecipes : ternario,
        //if, else if, else
      };

      case ORDER_BY_NAME:
      /*  let totalRecipes = [...state.allRecipes]; */
      let sortedRecipes =
        action.payload === "A-Z"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "default" ? state.recipes : sortedRecipes,
      };

      // case 'FILTER_CREATED':
      //       const AllRecipes = state.allRecipes
      //       const createdFilter = action.payload === 'created' ? 
      //       AllRecipes.filter(el => el.createdInDb === true) :
      //       AllRecipes.filter(el => !el.createdInDb)
      //       return{
      //           ...state,
      //           recipes:  action.payload === 'All' ? allRecipes : createdFilter
      //       }
      
        case ORDER_BY_SCORE_LIKES:
          let orderedRecipes =
          action.payload === "Desc"
          ? state.recipes.sort((a, b) => a.aggregateLikes - b.aggregateLikes)
          : state.recipes.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
          return {
          ...state,
          recipes: action.payload === "All" ? state.recipes : orderedRecipes,
        };

        case GET_NAME_RECIPE:
          return {
          ...state,
          recipes: action.payload,
        };

        case GET_DIETS:
          return {
          ...state,
          diets: action.payload,
        };

        case POST_RECIPE:
          return {
          ...state,
        };
      
        case GET_DETAIL:
          return {
          ...state,
          detail: action.payload,
        };
      default:
        return state;
}
};

export default rootReducer;