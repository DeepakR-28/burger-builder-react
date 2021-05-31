import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "../ContactData/ContactData"

class Checkout extends Component{

    cancelPurchaseHandler = () =>{
        this.props.history.goBack();
    }
    continuePurchaseHandler = () =>{
        this.props.history.push('/checkout/contact-details')
    }
    
    render(){
        let summary = <Redirect to = "/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to ='/' /> : null
            summary = (<div>
                        {purchasedRedirect}
                        <CheckoutSummary 
                            ingredients = {this.props.ings}
                            purchaseContinued = {this.continuePurchaseHandler}
                            purchaseCancelled = {this.cancelPurchaseHandler}
                            />
                        <Route 
                            path = {this.props.match.path + "/contact-details"} 
                            component ={ContactData}
                            />
                            
                    </div>
            )
    }
        return summary
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)