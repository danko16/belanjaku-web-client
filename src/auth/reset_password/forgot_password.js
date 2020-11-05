import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../redux/reducers/auth';

import ResponseMessage from '../../shared/response_message';

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isError: state.auth.is_error,
  message: state.auth.message,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      forgotPassword: authActions.reqForgotPassword,
      clearMsg: authActions.clearMsg,
    },
    dispatch
  );

const ForgotPassword = ({ history, loading, isError, clearMsg, message, forgotPassword }) => {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState('');
  const [response, setResponse] = useState({
    message: '',
    isError: false,
  });

  useEffect(() => {
    if (!loading && message) {
      setResponse({
        message,
        isError,
      });
      clearMsg();
    }
  }, [clearMsg, message, loading, isError]);

  function handleEmail(e) {
    const inputValue = e.target.value;

    //eslint-disable-next-line
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!inputValue) {
      setEmail('');
      setInputError('Email harus diisi');
    } else if (!inputValue.match(emailFormat)) {
      setEmail('');
      setInputError('Format Email Salah');
    } else {
      setInputError('');
      setEmail(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      forgotPassword({ email });
    }
  }
  return (
    <div className="forgot-password">
      {response.message && <ResponseMessage response={response} setResponse={setResponse} />}
      <div className="header">
        <i
          onClick={() => {
            history.push('/login');
          }}
          className="fa fa-arrow-left"
          aria-hidden="true"
        ></i>
        <div>Reset Password</div>
      </div>
      <div className="content">
        <div className="text-center">
          Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang
          kata sandi.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email_phone">Email</label>
            <input
              type="text"
              className="form-control"
              onChange={handleEmail}
              name="email_phone"
              style={inputError ? { borderColor: 'rgb(239, 20, 74)' } : {}}
            />
            <span className="error" style={inputError ? { color: 'rgb(239, 20, 74)' } : {}}>
              {inputError}
            </span>
          </div>

          <button
            type="submit"
            className={ClassNames('submit-btn', {
              'is-valid': email ? true : false,
            })}
          >
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  forgotPassword: PropTypes.func,
  clearMsg: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(ForgotPassword);
