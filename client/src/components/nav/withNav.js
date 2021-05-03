import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';
import Nav from './nav';

const WithNav = () => {
    return (
        <Router>
          <Nav />
          <Route exact path='/' component={Home}/>
        </Router>
    )
}

export default WithNav
