import React from 'react'

import classes from './Order.css'
const order = (props) =>{
    let ingredients = []
    for(let ingredientName in props.ingredients){
        ingredients.push({
            igName : ingredientName,
            quantity : props.ingredients[ingredientName],
            key : ingredientName
        })
    }
    let ingredientData = ingredients.map(ig =>{
        return <span key = {ig.igName} className = {classes.Span}>{ig.igName} ({ig.quantity})</span>
    } )
    return(
        <div className = {classes.Order}>
            <p>Order id {props.orderId}</p>
            <p ><strong>Ingredients :</strong> {ingredientData}</p>
            <p><strong>Total: &#8377; {props.price.toFixed(2) * 80}</strong></p>
        </div>
    )
}

export default order