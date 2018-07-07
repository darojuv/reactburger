import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ings: ingredients
    }
}

const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initInigredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-772be.firebaseio.com/Ingredients.json')
        .then(response => {
            //this.setState({ingredients: response.data});
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            //this.setState({error: true});
            dispatch(fetchIngredientsFailed());
        });
        //dispatch(setIngredients);
    }
}