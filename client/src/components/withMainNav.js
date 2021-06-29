import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import BuyerProductDetails from '../pages/buyerProductDetails';
import BuyerProfile from '../pages/buyerProfile';
import Cart from '../pages/cart';
import Home from '../pages/home';
import RegisterShop from '../pages/registerShop';
import Shop from '../pages/shop';
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
            <Route path='/profile' component={BuyerProfile}/>
            <Route path='/shop/:shop_name' component={Shop}/>
            
            
          </Switch>
        </Router>
    )
}

export default WithMainNav
