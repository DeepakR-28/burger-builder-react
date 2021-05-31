import * as actionType from '../actions/actionTypes'

const initialState ={
    price : 4,
    ingredients :null,
    error : false,
    purchasable : false,
    building: false
}
const INGREDIENTS_PRICE = {
    salad: 0.3,
    bacon: 0.7,
    meat:1,
    cheese:0.5
}
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case (actionType.ADD_INGREDIENT):
            
            return{
                ...state,
                ingredients : { 
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                price : state.price + INGREDIENTS_PRICE[action.ingredientName],
                purchasable : true,
                building:true
                
            }
        case actionType.REMOVE_INGREDIENT:
            
            return{
                ingredients : { 
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                building:true,
                price : state.price - INGREDIENTS_PRICE[action.ingredientName],
                purchasable : Object.keys(state.ingredients).reduce((sum,igKey) =>{
                    return sum + state.ingredients[igKey]
                },0) > 1
            }
        case actionType.SET_INGREDIENT:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 4,
                building:false
            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error : true
            }
        default : return state
    }

}
export default reducer