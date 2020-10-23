import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { authActions } from '../../redux/reducers/auth';
import ResponseMessage from '../../shared/response_message';

import './css/confirm_otp.css';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  message: state.auth.message,
  isError: state.auth.is_error,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    { confirmOtp: authActions.reqConfirmOtp, clearMsg: authActions.clearError },
    dispatch
  );

const ConfirmOtp = ({ confirmOtp, clearMsg, loading, message, isError }) => {
  const [otp, setOtp] = useState({
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    fourthInput: '',
  });
  const [response, setResponse] = useState({
    message: '',
    isError: false,
  });

  useEffect(() => {
    if (message && !loading) {
      setResponse({ message, isError });
      clearMsg();
    }
  }, [message, loading, isError, clearMsg]);

  function handleKeyPress(e, input) {
    const previousSibling = e.target.previousSibling;

    if (e.key === ' ') {
      e.preventDefault();
    }

    if (e.key === 'Backspace' && previousSibling && !otp[input]) {
      previousSibling.focus();
    }
  }

  function handleInput(e, input) {
    const nextSibling = e.target.nextSibling;

    if (e.target.value.match(/^[0-9]*$/)) {
      setOtp({ ...otp, [input]: e.target.value });

      if (e.target.value && nextSibling) {
        nextSibling.focus();
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (otp.firstInput && otp.secondInput && otp.thirdInput && otp.fourthInput) {
      const otpFinal = otp.firstInput + otp.secondInput + otp.thirdInput + otp.fourthInput;
      confirmOtp({
        otp: otpFinal,
      });
    }
  }
  return (
    <div className="confirm-otp">
      {response.message && <ResponseMessage response={response} setResponse={setResponse} />}
      <div className="header">Verifikasi Email</div>
      <div className="content">
        <i className="fa fa-envelope" aria-hidden="true"></i>
        <h4>Masukkan Kode Verifikasi</h4>
        <div style={{ marginBottom: 36 }}>
          Kode verifikasi telah dikirim melalui e-mail ke danangekoyudanto1999@gmail.com.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'firstInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'firstInput');
              }}
              className={ClassNames({ 'is-valid': otp.firstInput })}
              value={otp.firstInput}
            />
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'secondInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'secondInput');
              }}
              className={ClassNames({ 'is-valid': otp.secondInput })}
              value={otp.secondInput}
            />
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'thirdInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'thirdInput');
              }}
              className={ClassNames({ 'is-valid': otp.thirdInput })}
              value={otp.thirdInput}
            />
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'fourthInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'fourthInput');
              }}
              className={ClassNames({ 'is-valid': otp.fourthInput })}
              value={otp.fourthInput}
            />
          </div>
          <button
            className={ClassNames('submit-btn', {
              'is-valid': otp.firstInput && otp.secondInput && otp.thirdInput && otp.fourthInput,
            })}
            disabled={!(otp.firstInput && otp.secondInput && otp.thirdInput && otp.fourthInput)}
          >
            Verifikasi
          </button>
        </form>
        <div>
          Tidak menerima kode? <span className="link-word">Kirim ulang</span>
        </div>
      </div>
    </div>
  );
};

ConfirmOtp.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  confirmOtp: PropTypes.func,
  clearMsg: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(ConfirmOtp);
