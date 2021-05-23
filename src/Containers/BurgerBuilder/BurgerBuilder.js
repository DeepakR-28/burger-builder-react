import React,{ Component } from 'react';

import Burger from '../../Components/Burger/Burger'
import Aux from '../../hoc/Auxiliary'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENTS_PRICE = {
    salad: 0.3,
    bacon: 0.7,
    meat:1,
    cheese:0.5
}
class BurgerBuilder extends Component{

    state = {
        ingredients : null,
        price : 4,
        purchasable: false,
        purchasing: false,
        loading : false,
        error : false
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://burger-builder-dayta-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json')
        .then(response => {
            this.setState({
                ingredients : response.data
            })
        })
        .catch(error =>{
            this.setState({
                error: true
            })
        })
    }
    
    displayOrderSummary = () =>{
        this.setState({
            purchasing:true
        })
    }

    cancelPurchaseHandler = () =>{
        this.setState({
            purchasing: false
        })
    }
    continuePurchaseHandler = () =>{
       
        const queryParams = []
        for ( let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.price )
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname : '/checkout',
            search :'?' + queryString
        })
    }
    

    updatePurchasableState = (ingredients) =>{
        const sum = Object.keys(ingredients).reduce((sum,igKey) =>{
            return sum + ingredients[igKey]
        },0)
        this.setState({
            purchasable: sum>0
        })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const newCount = oldCount+1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.price
        const updatedPrice = oldPrice + INGREDIENTS_PRICE[type]
        this.setState({
            price: updatedPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasableState(updatedIngredients);
    }
    removeIngredientHandler = (type) =>{
        console.log(this.state.price)
        const oldCount = this.state.ingredients[type]
        if(oldCount<=0){
            return;
        }
        const newCount = oldCount-1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const oldPrice = this.state.price
        const updatedPrice = oldPrice - INGREDIENTS_PRICE[type]
        this.setState({
            price: updatedPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasableState(updatedIngredients);
    }
    render(){

        let burger = this.state.error ? <p>Can't load your ingredients</p> : <Spinner />
        let orderSummary = <Spinner />
        if(this.state.ingredients){
            burger = <Burger ingredients = {this.state.ingredients}/>
            
            orderSummary = (<OrderSummary 
            ingredients = {this.state.ingredients} 
            hide = {this.cancelPurchaseHandler} 
            success = {this.continuePurchaseHandler}
            price = {this.state.price}
            />)
        }

        const disabledInfo = {
            ...this.state.ingredients
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
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.price}
                        purchasable = {this.state.purchasable}
                        ordered = {this.displayOrderSummary}
                    />
                </div>
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);