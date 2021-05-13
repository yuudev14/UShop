import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import MainNav from './nav/main_nav';

const WithMainNav = () => {
    return (
        <Router>
          <MainNav />
          <Route exact path='/' component={Home}/>
        </Router>
    )
}

export default WithMainNav
