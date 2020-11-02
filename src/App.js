import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux';

import './App.css';

import Register from './auth/register';
import Login from './auth/login';
import Header from './shared/header';
import Home from './home';

const NoMatch = React.lazy(() => import('./shared/no_match'));

function App() {
  return (
    <Router>
      <ConnectedRouter history={history}>
        <React.Suspense fallback={<div>Loading</div>}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Header />
                <Home />
              </Route>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </React.Suspense>
      </ConnectedRouter>
    </Router>
  );
}

export default App;
