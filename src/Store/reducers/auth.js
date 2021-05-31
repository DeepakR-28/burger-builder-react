import * as actionType from '../actions/actionTypes'

let initialState = {
    token : null,
    error : null,
    userId : null,
    loading : false,
    authRedirectPath: '/'
}
const reducer = (state= initialState,action) =>{
    switch(action.type){
        case actionType.AUTH_START:
            return{
                ...state,
                error: null,
                loading: true
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token : action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            }
    
        case actionType.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                token : null,
                userId : null
            }
        case actionType.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath : action.path
            }
        default:
            return state
    }   
    
}

export default reducer