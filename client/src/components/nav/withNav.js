import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';

const WithNav = () => {
    return (
        <Router>
          <Route exact path='/' component={Home}/>
        </Router>
    )
}

export default WithNav
