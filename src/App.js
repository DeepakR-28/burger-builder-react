import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders'
import Logout from './Containers/Logout/Logout'
import Auth from './Containers/Auth/Auth'
import * as actions from './Store/actions/index'


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path = '/auth' component = {Auth}/>
        <Route path = '/' exact component = {BurgerBuilder}/>
        <Redirect to = '/' />
    </Switch>
    )

    if(this.props.authId){
      routes = (
        <Switch>
            <Route path = '/checkout' component = {Checkout}/>
            <Route path = '/orders' component = {Orders}/>
            <Route path = '/logout' component = {Logout}/>
            <Route path = '/' exact component = {BurgerBuilder}/>
            <Redirect to = '/' />
          </Switch>
      )
    }
    return (
      <div>
        <Layout >
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state  =>{
  return {
    authId : state.auth.token
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
