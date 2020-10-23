import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../utils/auth';

import Register from './register';
import ConfirmOtp from './confirm_otp';
import RegisterComplete from './register_complete';

const mapStateToProps = (state) => ({
  confirmToken: state.auth.confirm_token,
  registerToken: state.auth.register_token,
});

const RegisterMain = ({ confirmToken, registerToken }) => {
  function renderRegister() {
    if (confirmToken && isAuthenticated('confirm')) {
      return <ConfirmOtp />;
    } else if (registerToken && isAuthenticated('register')) {
      return <RegisterComplete />;
    } else {
      return <Register />;
    }
  }
  return <div>{renderRegister()}</div>;
};

RegisterMain.propTypes = {
  confirmToken: PropTypes.object,
  registerToken: PropTypes.object,
};

export default connect(mapStateToProps)(RegisterMain);
