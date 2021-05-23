import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "../ContactData/ContactData"

class Checkout extends Component{

    state = {
        ingredients :null,
        totalPrice : 0
    }
    componentWillMount(){
        
        const query  = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query.entries()){
            if(param[0] === "price"){
                price = +param[1]
            }
            else{
                ingredients[param[0]] = +param[1]
            } 
        }
        
        this.setState({
            ingredients : ingredients,
            totalPrice : price
        })
    }
    

    cancelPurchaseHandler = () =>{
        this.props.history.goBack();
    }
    continuePurchaseHandler = () =>{
        this.props.history.push('/checkout/contact-details')
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients}
                    purchaseContinued = {this.continuePurchaseHandler}
                    purchaseCancelled = {this.cancelPurchaseHandler}
                    />
                <Route 
                    path = {this.props.match.path + "/contact-details"} 
                    render = {(props) => <ContactData 
                                        ingredients = {this.state.ingredients}
                                        price = {this.state.totalPrice}
                                        {...props}
                                        />}
                    />
            </div> 
        )
    }
}

export default Checkout