import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import One from './One';
import Two from './Two';
import Three from './Three';
import WebChat from './WebChat';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">Home</Link>
          <Link to="/one">One</Link>
          <Link to="/two">Two</Link>
          <Link to="/three">Three</Link>
        </header>

        <Switch>
          <Route path="/one">
            <One />
          </Route>
          <Route path="/two">
            <Two />
          </Route>
          <Route path="/three">
            <Three />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <WebChat />
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default App;
