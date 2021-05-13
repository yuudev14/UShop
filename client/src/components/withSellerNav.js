import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SellUshopAuth from '../pages/sellUshopAuth';
import Seller_nav from './nav/seller_nav';

const WithSellerNav = () => {
    return (
            <Router>
                <Switch>
                    <Seller_nav />
                    <Router path='/sell-UShop/auth' component={SellUshopAuth}/>
                </Switch>
            </Router>
    )
}

export default WithSellerNav
