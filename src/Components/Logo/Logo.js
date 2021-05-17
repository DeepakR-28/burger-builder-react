import React from 'react'

import burgerLogo from '../../Assets/images/27.1 burger-logo.png.png'
import classes from './Logo.css'

const logo = () =>{
    return (
        <div className = {classes.Logo}>
            <img src = {burgerLogo} alt ="burgerLogo"/>
        </div>
    )
}

export default logo