import React from 'react'
import classes from './Input.css'
const input = (props) =>{
    let inputType = null
    const inputClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case("input"):
            inputType = <input {...props.elementConfig} 
                        className = {inputClasses.join(' ')} 
                        value = {props.value} 
                        onChange= {props.changed}/>
            break;
        case("textarea"):
            inputType = <textarea {...props.elementConfig} 
                        className ={inputClasses.join(' ')} 
                        value = {props.value} 
                        onChange= {props.changed}/>
            break;
        case("select"):
            inputType = (<select 
                        className = {inputClasses.join(' ')}
                        value = {props.value}
                        onChange= {props.changed}>
                        {props.elementConfig.options.map(option =>{
                            return <option key ={option.value}value = {option.value}> 
                                        {option.displayValue}
                            </option> 
                                    })}
                                </select>)
            break;
        default:
            inputType = <input {...props.elementConfig} 
                        className ={inputClasses.join(' ')}  
                        value = {props.value} 
                        onChange= {props.changed}/>
            break;
    }
    return(
        <div className = {classes.Input}>
            <label className = {classes.LabelElement}>{props.label}</label>
            {inputType}
        </div>
    )
}
export default input