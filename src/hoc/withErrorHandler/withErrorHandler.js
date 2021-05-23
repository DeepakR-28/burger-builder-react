import React, { Component } from 'react'

import Modal from '../../Components/UI/Modal/Modal'
import Aux from '../Auxiliary'
const withErrorHandler = (WrappedContent,axios) => {
    return class extends Component{

        state = {
            error: null
        }

        constructor () {
            super();
            // eslint-disable-next-line no-this-before-super
            this.reqInterceptor =axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req;
                })
            
            // eslint-disable-next-line no-this-before-super
            this.resInterceptor = axios.interceptors.response.use( res => res,error =>{
                this.setState({error:error})
                })   
            }

            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptor)
                axios.interceptors.response.eject(this.resInterceptor)
            }

            errorConfirmedHandler = () =>{
                this.setState({error:null})
            }
        
        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error} hide ={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContent {...this.props} />
                </Aux>
            )   
        }
    }
}

export default withErrorHandler