import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux';

import './App.css';

import Register from './auth/register/';
import Header from './shared/header';
import Home from './home';

function App() {
  return (
    <Router>
      <ConnectedRouter history={history}>
        <React.Suspense fallback={<div>Loading</div>}>
          <div className="App" style={{ height: '200vh' }}>
            <Switch>
              <Route exact path="/">
                <Header />
                <Home />
              </Route>
              <Route path="/register" component={Register} />
              <Route>
                <div>404 Not Found</div>
              </Route>
            </Switch>
          </div>
        </React.Suspense>
      </ConnectedRouter>
    </Router>
  );
}

export default App;
