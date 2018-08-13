import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: name
    }
}

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: name
    }
}

const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

const setIngredientsFailed = () => {
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axiosInstance.get('https://burger-builder-4a877.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setIngredientsFailed());
            });
    }
}