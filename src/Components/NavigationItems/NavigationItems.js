import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const navigationItems = (props) =>(
    
    <ul className={classes.NavigationItems}>
        <NavigationItem link = "/">Burger Builder</NavigationItem>
        {props.authId ? <NavigationItem link ="/orders">Orders</NavigationItem> : null}
        {!props.authId ? <NavigationItem link ="/auth">Authenticate</NavigationItem> :
        <NavigationItem link ="/logout">Logout</NavigationItem>}
    </ul>
)
export default navigationItems