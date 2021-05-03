import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import WithNav from './components/nav/withNav';

const App = () =>{

  return (
    <div className="App">
        <Router>
          <Route path='/' component={WithNav}/>
        </Router>

    </div>
  );
}

export default App;
