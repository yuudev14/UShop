import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import WithNav from './components/nav/withNav';
import SellUshopAuth from './pages/sellUshopAuth';

const App = () =>{

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={WithNav}/>
            <Route path='/sell-UShop' component={SellUshopAuth}/>
          </Switch>
        </Router>

    </div>
  );
}

export default App;
