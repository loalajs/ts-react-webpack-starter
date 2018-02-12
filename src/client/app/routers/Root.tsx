import * as React from 'react';
import reactLoadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from 'components/Home';
import Loading from 'components/Loading';
import withTheme from 'components/hocs/Theme/withTheme';

/** Define the below-the-fold modules */
const AsyncAbout = reactLoadable({
  // tslint:disable-next-line:space-in-parens
  loader: () => import(
    /* webpackChunkName: "route-about" */
    /* webpackMode: "lazy" */
    'components/About'),
  loading: Loading,
});

const Root = () => (
  <Router>
    <main>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/others">Others</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={AsyncAbout} />
        <Redirect to="/" />
      </Switch>
    </main>
  </Router>
);

export default withTheme(Root);
