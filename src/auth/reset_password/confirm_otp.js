import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { authActions } from '../../redux/reducers/auth';
import ResponseMessage from '../../shared/response_message';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  message: state.auth.message,
  email: state.auth.reset_email,
  phone: state.auth.reset_phone,
  isError: state.auth.is_error,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    { confirmOtp: authActions.reqConfirmReset, clearMsg: authActions.clearMsg },
    dispatch
  );

const ConfirmOtp = ({ confirmOtp, clearMsg, email, phone, loading, message, isError, history }) => {
  const [otp, setOtp] = useState({
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    fourthInput: '',
    fifthInput: '',
    sixthInput: '',
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

  function isInputValid() {
    if (
      otp.firstInput &&
      otp.secondInput &&
      otp.thirdInput &&
      otp.fourthInput &&
      otp.fifthInput &&
      otp.sixthInput
    ) {
      return true;
    }

    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isInputValid()) {
      const otpFinal =
        otp.firstInput +
        otp.secondInput +
        otp.thirdInput +
        otp.fourthInput +
        otp.fifthInput +
        otp.sixthInput;

      confirmOtp({
        otp: otpFinal,
      });
    }
  }
  return (
    <div className="confirm-otp">
      {response.message && <ResponseMessage response={response} setResponse={setResponse} />}
      <div className="header">
        <i
          onClick={() => {
            history.push('/login');
          }}
          className="fa fa-arrow-left"
          aria-hidden="true"
        ></i>
        <div>Verifikasi {email ? 'Email' : 'Nomor Telephone'}</div>
      </div>
      <div className="content">
        <i className="fa fa-envelope" aria-hidden="true"></i>
        <h4>Masukkan Kode Verifikasi</h4>
        <div style={{ marginBottom: 36 }}>
          Kode verifikasi telah dikirim melalui {email ? 'email' : 'nomor telephone'} ke{' '}
          {email ? email : phone}.
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
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'fifthInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'fifthInput');
              }}
              className={ClassNames({ 'is-valid': otp.fifthInput })}
              value={otp.fifthInput}
            />
            <input
              type="tel"
              autoComplete="off"
              maxLength="1"
              minLength="1"
              pattern="[0-9]"
              onChange={(e) => {
                handleInput(e, 'sixthInput');
              }}
              onKeyDown={(e) => {
                handleKeyPress(e, 'sixthInput');
              }}
              className={ClassNames({ 'is-valid': otp.sixthInput })}
              value={otp.sixthInput}
            />
          </div>
          <button
            type="submit"
            className={ClassNames('submit-btn', {
              'is-valid': isInputValid(),
            })}
            disabled={!isInputValid()}
          >
            Verifikasi
          </button>
        </form>
      </div>
    </div>
  );
};

ConfirmOtp.propTypes = {
  history: PropTypes.object,
  message: PropTypes.string,
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  confirmOtp: PropTypes.func,
  clearMsg: PropTypes.func,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default connect(mapStateToProps, mapActionToProps)(ConfirmOtp);
