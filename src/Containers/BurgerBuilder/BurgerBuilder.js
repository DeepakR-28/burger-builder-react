import React,{ Component } from 'react';

import Burger from '../../Components/Burger/Burger'
import Aux from '../../hoc/Auxiliary'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
const INGREDIENTS_PRICE = {
    salad: 0.3,
    bacon: 0.7,
    meat:1,
    cheese:0.5
}
class BurgerBuilder extends Component{

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            meat:0,
            cheese:0,
        },
        price : 4,
        purchasable: false,
        purchasing: false
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
        alert('ORDER PLACED')
        console.log('continue purchase')
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
        console.log(this.state)
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
        const disabledInfo = {
            ...this.state.ingredients
        }  
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} hide = {this.cancelPurchaseHandler} >
                <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    hide = {this.cancelPurchaseHandler} 
                    success = {this.continuePurchaseHandler}
                    price = {this.state.price}
                    />
                </Modal>;
                <div>
                    <Burger ingredients = {this.state.ingredients}/>
                </div>               <div>
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

export default BurgerBuilder;