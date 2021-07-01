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
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BuyerAllOrders from '../pages/buyerAllOrders';

const WithMainNav = ({auth}) => {
    return (
        <Router>
          <MainNav />
          <Switch>
            <Route path='/auth' component={UshopAuth}/>
            
            <Route exact path='/' component={Home}/>
            <Route path='/product/:product_id' component={BuyerProductDetails} />
            
            
            <Route path='/shop/:shop_name' component={Shop}/>

            {auth.isAuth === true  && (
              <>
                <Route path='/profile' component={BuyerProfile}/>
                <Route path='/registerShop' component={RegisterShop}/>
                <Route path='/orders' component={BuyerAllOrders}/>
                <Route path='/cart' component={Cart}/>
              </>
            )}
            {auth.isAuth === false && (
                <Redirect to='/auth' />
            )}
            
            
          </Switch>
        </Router>
    )
}

const mapStateToProps = state => {
  return{
    auth : state.auth
  }
}

export default connect(mapStateToProps)(WithMainNav)
