import React from 'react'

import Button from '../../UI/Button/Button'

const orderSummary = (props) =>{
    const summary = Object.keys(props.ingredients).map(igKey =>{
        return <li key = {igKey}>{igKey} : {props.ingredients[igKey]}</li>
    })
    return(
    <div>
        <h3>YOUR ORDER</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{summary}</ul>
        <p><strong>Your Total : {props.price.toFixed(2)}</strong></p>
        <Button clicked = {props.hide} btnType = "Danger"> CANCEL</Button>
        <Button clicked = {props.success}btnType = "Success">CONTINUE</Button>
    </div>)
}

export default orderSummary