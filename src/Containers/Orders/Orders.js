import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../../axios-order'
import Order from '../../Components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../Store/actions/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = (this.props.orders.map(order =>{
                return <Order 
                            ingredients = {order.ingredients}
                            price = {+order.Amount}
                            key = {order.id}
                            orderId = {order.id}
                            />
            }))
        }
        let order = orders
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders , axios))