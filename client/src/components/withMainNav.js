import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import SellUshopAuth from '../pages/sellUshopAuth';
import MainNav from './nav/main_nav';

const WithMainNav = () => {
    return (
        <Router>
          <MainNav />
          <Switch>
            <Route path='/' component={Home}/>
            
          </Switch>
        </Router>
    )
}

export default WithMainNav
