import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './styles';

ReactDOM.render(
    <Router>
      <main>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
    ,
    document.getElementById('app'),
);
