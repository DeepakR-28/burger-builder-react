import * as actionType from './actionTypes'
import axios from '../../axios-order'
export const addIngredient = (ingredient) =>{
    return {
        type : actionType.ADD_INGREDIENT,
        ingredientName : ingredient
    }
}

export const removeIngredient = (ingredient) =>{
    return {
        type : actionType.REMOVE_INGREDIENT,
        ingredientName : ingredient
    }
}

export const setIngredient = (ingredients) =>{
    return {
        type: actionType.SET_INGREDIENT,
        ingredients : ingredients
    }
}
export const fetchIngredientFailed =() =>{
    return {
        type : actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://burger-builder-dayta-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
        .then(response => {
            dispatch(setIngredient(response.data))
        })
        .catch(error =>{
            dispatch(fetchIngredientFailed())
        })
    }
}