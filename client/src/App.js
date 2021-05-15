import {useEffect} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import WithMainNav from './components/withMainNav';
import WithSellerNav from './components/withSellerNav';
import { connect } from 'react-redux';
import {verifyToken} from './reduxStore/actions/authAction';

const App = (props) =>{

  const {
    verifyToken
  } = props;

  useEffect(() => {
    verifyToken()
  })

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path='/sell-UShop' component={WithSellerNav}/>
            <Route path='/' component={WithMainNav}/>
            
          </Switch>
        </Router>

    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      verifyToken : () => dispatch(verifyToken())
  }
}

export default connect(null, mapDispatchToProps)
                (App);
