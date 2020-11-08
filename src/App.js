import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { history, store } from './redux';
import { Api } from './utils/api';
import { authActions } from './redux/reducers/auth';

import './App.css';

import Register from './auth/register';
import Login from './auth/login';
import ResetPassword from './auth/reset_password';
import Header from './shared/header';
import Home from './home';

const NoMatch = React.lazy(() => import('./shared/no_match'));

const mapActionToProps = (dispatch) => bindActionCreators({ authFlow: authActions.flow }, dispatch);

Api.interceptors.request.use(
  function (config) {
    const { auth } = store.getState();
    const token = auth.login_token;

    if (token) {
      config.headers['x-token'] = `Bearer ${token.key}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function App({ authFlow }) {
  useEffect(() => {
    authFlow();
  }, [authFlow]);

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
              <Route path="/reset-password" component={ResetPassword} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </React.Suspense>
      </ConnectedRouter>
    </Router>
  );
}

App.propTypes = {
  authFlow: PropTypes.func,
};

export default connect(null, mapActionToProps)(App);
