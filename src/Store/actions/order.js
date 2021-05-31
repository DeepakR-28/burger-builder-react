import * as actionType from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type : actionType.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return {
        type : actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const startBurgerPurchase = () =>{
    return{
        type: actionType.START_BURGER_PURCHASE
    }
}

export const burgerPurchase = (orderData,token) =>{

    return dispatch =>{
        dispatch(startBurgerPurchase())
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response =>{
            console.log(response,1)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error =>{
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () =>{
    return {
        type : actionType.PURCHASE_INIT
    }
}


export const fetchOrderSuccess = (orders) =>{
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFail = (error) =>{
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}


export const fetchOrderStart = () =>{
    return {
        type : actionType.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId) =>{
    return dispatch =>{
        dispatch(fetchOrderStart())
        const queryParams = "?auth=" + token +'&orderBy="userId"&equalTo="' + userId  +'"'
        axios.get('/orders.json' + queryParams)
        .then(res =>{
            let fetchedOrders = []
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
          dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err =>{
            dispatch(fetchOrderFail(err))
        })
    }
}