import React,{ Component } from 'react';
import {connect} from 'react-redux'

import Burger from '../../Components/Burger/Burger'
import Aux from '../../hoc/Auxiliary'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../Store/actions/index';


class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }
    
    displayOrderSummary = () =>{
        if(this.props.isAuthenticated){
            this.setState({
                purchasing:true
            })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    cancelPurchaseHandler = () =>{
        this.setState({
            purchasing: false
        })
    }
    continuePurchaseHandler = () =>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
        
    }

    
    updatePurchasableState = (ingredients) =>{
        const sum = Object.keys(ingredients).reduce((sum,igKey) =>{
            return sum + ingredients[igKey]
        },0)
        this.setState({
            purchasable: sum>0
        })
    }

    render(){

        let burger = this.props.error ? <p>Can't load your ingredients</p> : <Spinner />
        let orderSummary = <Spinner />
        if(this.props.ings){
            burger = <Burger ingredients = {this.props.ings}/>
            orderSummary = (<OrderSummary 
            ingredients = {this.props.ings} 
            hide = {this.cancelPurchaseHandler} 
            success = {this.continuePurchaseHandler}
            price = {this.props.Totalprice }
            />)
        }

        const disabledInfo = {
            ...this.props.ings
        }  
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} hide = {this.cancelPurchaseHandler} >
                    {orderSummary}
                </Modal>;
                <div>
                    {burger}
                </div>    
                <div>
                    <BuildControls 
                        ingredientAdded = {this.props.onAddIngredient}
                        ingredientRemoved = {this.props.onRemoveIngredient}
                        disabled = {disabledInfo}
                        price = {this.props.Totalprice }
                        purchasable = {this.props.purchasable}
                        isAuth = {this.props.isAuthenticated}
                        ordered = {this.displayOrderSummary}
                    />
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        Totalprice : state.burgerBuilder.price,
        purchasable : state.burgerBuilder.purchasable,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingredient) => dispatch(actions.addIngredient(ingredient) ),
        onRemoveIngredient : (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients :() => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit() ),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));