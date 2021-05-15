import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import VerifiedSellUShop from '../components/verifiedSellUShop';
import Seller_nav from './nav/seller_nav';

const WithSellerNav = (props) => {

    
    return (
            
            <Router>
                <Seller_nav />
                <Switch>
                    
                    <Route path='/sell-UShop' component={VerifiedSellUShop}/>    
                </Switch>
            </Router>
    )
}

export default WithSellerNav
