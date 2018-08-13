import * as actionStypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    meat: 0.7,
    cheese: 1,
    bacon: 1.5
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionStypes.ADD_INGREDIENT:
        
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientType],
                building: true   
            }

        case actionStypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientType],
                building: true
            }

        case actionStypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4,
                building: false
            }

        case actionStypes.SET_INGREDIENTS_FAILED: 
            return {
                ...state,
                error: true
            }

        default: return state;
    }
}

export default reducer;