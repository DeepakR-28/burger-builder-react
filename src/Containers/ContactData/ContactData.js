import React ,{Component} from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.css'
import Button from '../../Components/UI/Button/Button'
import Spinner from '../../Components/UI/Spinner/Spinner'
import axios from '../../axios-order'
import Input from '../../Components/UI/Input/Input'
import * as actions from '../../Store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
class ContactData extends Component{
    state = {
        orderForm : {
            name : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder: "Your Name"
                },
                value : "",
                validation :{
                    required : true
                },
                touched: false
            }, 
            Street : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder: "Street Address"
                },
                value : "",
                validation :{
                    required : true
                },
                touched: false
            },
            State : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder: "State"
                },
                value : "",
                validation :{
                    required : true
                },
                touched: false
            },
            Pincode : {
                elementType : "input",
                elementConfig : {
                    type : "text",
                    placeholder: "Pincode"
                },
                value : "",
                validation :{
                    required : true,
                    minLength : 6,
                    maxLength : 6
                },
                touched: false
            },
            email: {
                elementType : "input",
                elementConfig : {
                    type : "email",
                    placeholder: "Email"
                },
                value : "",
                validation :{
                    required : true
                },
                touched: false
            },
            delivery : {
                elementType : "select",
                elementConfig : {
                    options : [{value : "fastest" , displayValue :"Fastest"}, {value : "Normal" , displayValue :"Standard"}]
                },
                value : "Standard",
                validation:{
                    required: false
                },
                touched: false
            }
            },
            totalPrice : 0,
            isValidForm : false
    }
    checkValidity(value, rules){
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }
    placeOrderHandler = (event) =>{
        event.preventDefault();
        
         const formData = { }
         for(let formElementIdentifier in this.state.orderForm ){
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
         }
        const order = {
            ingredients : this.props.ings,
            Amount : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token)
    }
    onChangeHandler = (event,inputIdentifier) =>{
        const updatedContactForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedContactForm[inputIdentifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        let isValidForm = true
        for(let validity in updatedFormElement){
            isValidForm = updatedFormElement[validity] && isValidForm
        }
        
        // console.log(updatedFormElement)
        updatedContactForm[inputIdentifier] = updatedFormElement
        this.setState({
            orderForm : updatedContactForm,
            isValidForm: isValidForm
        })
    }
    render(){

        let orderFormArray = []
        for(let key in this.state.orderForm){
            orderFormArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }    
        let form = (<form onSubmit = {this.placeOrderHandler} className = {classes.form}>

                    {orderFormArray.map(orderField =>{
                        return <Input
                                key = {orderField.id} 
                                elementType = {orderField.config.elementType} 
                                elementConfig = {{...orderField.config.elementConfig}} 
                                value = {orderField.config.value}
                                changed = {(event) => this.onChangeHandler(event,orderField.id)}
                                invalid = {!orderField.config.valid}
                                shouldValidate = {orderField.config.validation.required}
                                touched = {orderField.config.touched}
                                 />
                    })}
                    <Button disabled = {!this.state.isValidForm} btnType = "Success">Place Order</Button>
                    </form>
                    )
        if(this.props.loading === true){
            form = <Spinner />
        }
        return(
            <div className = {classes.ContactData}>
                <h3>Enter Delivery Address</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.price,
        loading: state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.burgerPurchase(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios))