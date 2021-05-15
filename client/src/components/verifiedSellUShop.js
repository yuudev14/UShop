import React, {useEffect} from 'react';
import { Redirect } from 'react-router';
import { verifySellerToken } from '../reduxStore/actions/authAction';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';


const VerifiedSellUShop = (props) => {

    const {
        auth,
        verifySeller
    } = props

    useEffect(() => {
        verifySeller()

    }, )
    return (
        <div className='sellUShop'>
            {(auth.isAuth === false && auth.type === 'seller') && (
                <Redirect to ='/sell-UShop/auth' />
            )}
            <Router>
                <Switch>
                    <Route exact path='/sell-UShop' render = {() => <div>home</div>}/>    
                </Switch>
            </Router>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifySeller : () => dispatch(verifySellerToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
                (VerifiedSellUShop)
