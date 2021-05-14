import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SellUshopAuth from '../pages/sellUshopAuth';
import VerifiedSellUShop from '../components/verifiedSellUShop';
import Seller_nav from './nav/seller_nav';
import { connect } from 'react-redux';
import { verifySellerToken } from '../reduxStore/actions/authAction';
import { Redirect } from 'react-router-dom';

const WithSellerNav = (props) => {

    
    return (
            
            <Router>
                <Seller_nav />
                <Switch>
                    <Route path='/sell-UShop/auth' component={SellUshopAuth}/>
                    <Route path='/sell-UShop' component={VerifiedSellUShop}/>    
                </Switch>
            </Router>
    )
}

export default WithSellerNav
