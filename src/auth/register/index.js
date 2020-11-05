import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import QS from 'query-string';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { authActions } from '../../redux/reducers/auth';
import { isAuthenticated } from '../../utils/auth';

import Register from './register';
import ConfirmOtp from './confirm_otp';
import RegisterComplete from './register_complete';

import '../css/auth.css';

const mapStateToProps = (state) => ({
  confirmToken: state.auth.confirm_register_token,
  registerToken: state.auth.register_token,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      setData: authActions.setData,
      confirmOtp: authActions.confirmOtp,
    },
    dispatch
  );

const RegisterMain = ({ history, confirmToken, registerToken, setData, confirmOtp }) => {
  useEffect(() => {
    const query = history.location.search;
    const parseQuery = QS.parse(query);
    if (query && parseQuery.email && parseQuery.key && parseQuery.exp) {
      setData('register_email', parseQuery.email);
      confirmOtp({ key: parseQuery.key, exp: parseQuery.exp });
    }
    window.history.replaceState({}, '', '/register');
  }, [history, setData, confirmOtp]);

  function renderRegister() {
    if (confirmToken && isAuthenticated('confirm_register')) {
      return <ConfirmOtp />;
    } else if (registerToken && isAuthenticated('register')) {
      return <RegisterComplete />;
    } else {
      return <Register />;
    }
  }
  return <div className="auth">{renderRegister()}</div>;
};

RegisterMain.propTypes = {
  history: PropTypes.object,
  confirmToken: PropTypes.object,
  registerToken: PropTypes.object,
  setData: PropTypes.func,
  confirmOtp: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(RegisterMain);
