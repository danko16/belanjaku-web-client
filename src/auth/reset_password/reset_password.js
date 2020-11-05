import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClassNames from 'classnames';
import { authActions } from '../../redux/reducers/auth';

import ResponseMessage from '../../shared/response_message';

const mapStateToProps = (state) => ({
  email: state.auth.reset_email,
  phone: state.auth.reset_phone,
  loading: state.auth.loading,
  message: state.auth.message,
  isError: state.auth.is_error,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      resetPassword: authActions.reqResetPassword,
      clearMsg: authActions.clearMsg,
    },
    dispatch
  );

const ResetPassword = ({
  history,
  email,
  phone,
  loading,
  message,
  isError,
  resetPassword,
  clearMsg,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputError, setInputError] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
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
  }, [loading, message, isError, clearMsg]);

  function handleNewPassword(e) {
    const inputValue = e.target.value;

    const passwordFormat = /^(?=.*[a-zA-Z]).{8,}$/;

    if (inputValue.length < 8) {
      setInputError((prevState) => ({
        ...prevState,
        newPassword: 'Password minimal 8 karakter',
      }));
    } else if (!inputValue.match(passwordFormat)) {
      setInputError((prevState) => ({
        ...prevState,
        newPassword: 'Password harus memiliki huruf alfabet',
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        newPassword: '',
      }));
      setNewPassword(inputValue);
    }
  }

  function handleConfirmPassword(e) {
    const inputValue = e.target.value;

    const passwordFormat = /^(?=.*[a-zA-Z]).{8,}$/;

    if (inputValue.length < 8) {
      setInputError((prevState) => ({
        ...prevState,
        confirmPassword: 'Password minimal 8 karakter',
      }));
    } else if (!inputValue.match(passwordFormat)) {
      setInputError((prevState) => ({
        ...prevState,
        confirmPassword: 'Password harus memiliki huruf alfabet',
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        confirmPassword: '',
      }));
      setConfirmPassword(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResponse({
        message: 'konfirmasi password tidak cocok',
        isError: true,
      });
    } else if (newPassword && confirmPassword) {
      resetPassword({
        password: newPassword,
      });
    }
  }
  return (
    <div className="reset-password">
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
          Reset Password untuk {email ? `email ${email}` : `nomor telephone ${phone}`}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Password baru</label>
            <input
              type={showPassword.newPassword ? 'text' : 'password'}
              name="password"
              onChange={handleNewPassword}
              onFocus={(e) => {
                e.target.readOnly = false;
              }}
              onBlur={(e) => {
                e.target.readOnly = true;
              }}
              className="form-control"
              style={inputError.newPassword ? { borderColor: 'rgb(239, 20, 74)' } : {}}
              readOnly
              autoComplete="off"
            />
            <span
              className="error"
              style={inputError.newPassword ? { color: 'rgb(239, 20, 74)' } : {}}
            >
              {inputError.newPassword}
            </span>
            <i
              className={`fa fa-eye${showPassword.newPassword ? '' : '-slash'}`}
              aria-hidden="true"
              onClick={() => {
                setShowPassword((prevState) => ({
                  ...prevState,
                  newPassword: !prevState.newPassword,
                }));
              }}
            ></i>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi password</label>
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              name="password"
              onChange={handleConfirmPassword}
              onFocus={(e) => {
                e.target.readOnly = false;
              }}
              onBlur={(e) => {
                e.target.readOnly = true;
              }}
              className="form-control"
              style={inputError.confirmPassword ? { borderColor: 'rgb(239, 20, 74)' } : {}}
              readOnly
              autoComplete="off"
            />
            <span
              className="error"
              style={inputError.confirmPassword ? { color: 'rgb(239, 20, 74)' } : {}}
            >
              {inputError.confirmPassword}
            </span>
            <i
              className={`fa fa-eye${showPassword.confirmPassword ? '' : '-slash'}`}
              aria-hidden="true"
              onClick={() => {
                setShowPassword((prevState) => ({
                  ...prevState,
                  confirmPassword: !prevState.confirmPassword,
                }));
              }}
            ></i>{' '}
          </div>
          <button
            className={ClassNames('submit-btn', {
              'is-valid': newPassword && confirmPassword,
            })}
            disabled={!newPassword && !confirmPassword ? true : false}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object,
  email: PropTypes.string,
  phone: PropTypes.string,
  loading: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  resetPassword: PropTypes.func,
  clearMsg: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(ResetPassword);
