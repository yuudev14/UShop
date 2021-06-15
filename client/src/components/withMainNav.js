import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import BuyerProductDetails from '../pages/buyerProductDetails';
import Cart from '../pages/cart';
import Home from '../pages/home';
import RegisterShop from '../pages/registerShop';
import UshopAuth from '../pages/ushopAuth';
import MainNav from './nav/main_nav';

const WithMainNav = () => {
    return (
        <Router>
          <MainNav />
          <Switch>
            <Route path='/auth' component={UshopAuth}/>
            <Route path='/registerShop' component={RegisterShop}/>
            <Route exact path='/' component={Home}/>
            <Route path='/product/:product_id' component={BuyerProductDetails} />
            <Route path='/cart' component={Cart}/>
            
            
          </Switch>
        </Router>
    )
}

export default WithMainNav
