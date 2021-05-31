import React,{ Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    
    state ={
        showSideDrawer : false
    }

    sideDrawerClosedHandler =() =>{
        this.setState({
            showSideDrawer : false
        })
    }
    sideDrawerOpenHandler =() =>{
        this.setState({
            showSideDrawer: true
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar open = {this.sideDrawerOpenHandler} authenticationId = {this.props.authId}/>
                <SideDrawer  
                    closed ={this.sideDrawerClosedHandler} 
                    open = {this.state.showSideDrawer} 
                    authenticationId = {this.props.authId}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state =>{
    return{
        authId : state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)