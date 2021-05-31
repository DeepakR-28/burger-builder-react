import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../Store/actions/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Auth extends Component {

    state = {
        controls : {
            email : {
                elementType : "input",
                elementConfig : {
                    type : "email",
                    placeholder: "Your email"
                },
                value : "",
                validation :{
                    required : true
                },
                touched: false,
                valid: false
            },
            password: {
                elementType : "input",
                elementConfig : {
                    type : "password",
                    placeholder: "Password"
                },
                value : "",
                validation :{
                    required : true,
                    minLength : 3
                },
                touched: false,
                valid: false
        }
    },
    isSignUp : true
}
componentDidMount(){
    if(this.props.buildingBurger && this.props.authRedirectPath !== '/'){
        this.props.onSetAuthRedirectPath()
    }
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
onChangeHandler = (event,inputIdentifier) =>{
    const updatedControls = {
        ...this.state.controls,
        [inputIdentifier] :{
             ...this.state.controls[inputIdentifier],
             value: event.target.value,
             touched : true,
             valid : this.checkValidity(event.target.value,this.state.controls[inputIdentifier].validation)
            },
    }
    this.setState({controls: updatedControls})
}
submitHandler =(event) =>{
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
}

onSwitchHandler = () =>{
    this.setState(prevState =>{
        return {isSignUp : !prevState.isSignUp}
    })
}
    render(){
        let authFormArray = []
        for(let key in this.state.controls){
            authFormArray.push({
                id : key,
                config : this.state.controls[key]
            })
        } 
        let form = (authFormArray.map(field =>{
            return <Input 
                key = {field.id} 
                elementType = {field.config.elementType}
                elementConfig = {{...field.config.elementConfig}}
                value = {field.config.value}
                changed = {(event) => this.onChangeHandler(event,field.id)}
                invalid = {!field.config.valid}
                shouldValidate = {field.config.validation.required}
                touched = {field.config.touched}/>
        }))
        if(this.props.loading){
            form = <Spinner />
        }
        let error = null
        if(this.props.error){
            error = this.props.error.data.error.message
        }
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to = {this.props.authRedirectPath}/>
        }
        return (
            
            <div className = {classes.Auth}>
                {authRedirect}
                <p>{error}</p>
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType = "Success" >PROCEED</Button>

                    <Button btnType = "Danger" clicked = {this.onSwitchHandler} >SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !==null, 
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)