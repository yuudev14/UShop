import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SellUshopAuth from '../pages/sellUshopAuth';
import SellUShopHome from '../pages/sellUShopHome';
import Seller_nav from './nav/seller_nav';

const WithSellerNav = () => {
    return (
            <Router>
                <Seller_nav />
                <Switch>
                    <Route exact path='/sell-UShop' component={SellUShopHome}/>
                    <Route path='/sell-UShop/auth' component={SellUshopAuth}/>
                
                    
                </Switch>
            </Router>
    )
}

export default WithSellerNav
