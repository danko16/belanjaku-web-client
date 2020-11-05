import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QS from 'query-string';
import { isAuthenticated } from '../../utils/auth';
import { authActions } from '../../redux/reducers/auth';

import ForgotPassword from './forgot_password';
import ConfirmOtp from './confirm_otp';
import ResetPassword from './reset_password';

import '../css/auth.css';

const mapStateToProps = (state) => ({
  confirmToken: state.auth.confirm_reset_token,
  resetToken: state.auth.reset_token,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      setData: authActions.setData,
      confirmReset: authActions.confirmReset,
    },
    dispatch
  );

const ResetMain = ({ history, confirmToken, resetToken, confirmReset, setData }) => {
  useEffect(() => {
    const query = history.location.search;
    const parseQuery = QS.parse(query);
    if (query && parseQuery.email && parseQuery.key && parseQuery.exp) {
      setData('reset_email', parseQuery.email);
      confirmReset({ key: parseQuery.key, exp: parseQuery.exp });
    }
    window.history.replaceState({}, '', '/reset-password');
  }, [history, setData, confirmReset]);

  function renderReset() {
    if (confirmToken && isAuthenticated('confirm_reset')) {
      return <ConfirmOtp history={history} />;
    } else if (resetToken && isAuthenticated('reset')) {
      return <ResetPassword history={history} />;
    } else {
      return <ForgotPassword history={history} />;
    }
  }
  return <div className="auth">{renderReset()}</div>;
};

ResetMain.propTypes = {
  history: PropTypes.object,
  confirmToken: PropTypes.object,
  resetToken: PropTypes.object,
  confirmReset: PropTypes.func,
  setData: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(ResetMain);
