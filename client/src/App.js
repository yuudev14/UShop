import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import WithMainNav from './components/withMainNav';
import WithSellerNav from './components/withSellerNav';
import SellUshopAuth from './pages/sellUshopAuth';

const App = () =>{

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path='/sell-UShop' component={WithSellerNav}/>
            <Router path='/sell-UShop/auth' component={WithSellerNav}/>
            <Route path='/' component={WithMainNav}/>
            
          </Switch>
        </Router>

    </div>
  );
}

export default App;
