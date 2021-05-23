import React, { Component } from 'react'

import axios from '../../axios-order'
import Order from '../../Components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{

    state = {
        orders : [],
        loading : true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res =>{
            let fetchedOrders = []
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                })
            }
            this.setState({loading:false , orders : fetchedOrders})
        })
        .catch(err =>{
            this.setState({loading : false})
            console.log(err)
        })
    }
    render(){
        let order = this.state.orders.map(order =>{
            return <Order 
                        ingredients = {order.ingredients}
                        price = {+order.Amount}
                        key = {order.id}
                        orderId = {order.id}
                        />
        })
        return (
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders , axios)