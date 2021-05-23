import React from 'react'
import classes from './NavigationItem.css'
import {NavLink} from 'react-router-dom'
// import {Link, Route} from 'react-router-dom'
const navigationItem = (props) =>{
    return(
        <div>
            <li className = {classes.NavigationItem}>
                <NavLink
                exact
                    to = {props.link}
                    activeClassName = {classes.active}
                    >{props.children}</NavLink></li>
        </div>
    )
}

export default navigationItem 