import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 0,
    baconHalal: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 2.5,
};

const INGREDIENTS_PRICES = {
  salad: 0.8,
  baconHalal: 1.2,
  cheese: 1.5,
  meat: 2.4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
      };
    case actionTypes.RESET_STATE:
      return {
        ...state,
        totalPrice: 2.5,
        ingredients: {
          salad: 0,
          baconHalal: 0,
          cheese: 0,
          meat: 0,
        },
      };
    default:
      return state;
  }
};

export default reducer;
