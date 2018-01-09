import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reactLoadable from 'react-loadable';
import Loading from './components/Loading';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './components/Home';



/** Define the below-the-fold modules */
const AsyncAbout = reactLoadable({
  loader: () => import('./components/About'),
  loading: Loading,
});

/** Base style that contains normalize-scss */
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
          <Route path="/about" component={AsyncAbout} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
    ,
    document.getElementById('app'),
);
