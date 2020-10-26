import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { authActions } from '../../redux/reducers/auth';
import ResponseMessage from '../../shared/response_message';

import './css/register.css';

const mapStateToProps = (state) => ({
  isError: state.auth.is_error,
  loading: state.auth.loading,
  email: state.auth.email,
  phone: state.auth.phone,
  message: state.auth.message,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      register: authActions.reqRegisterComplete,
      clearMsg: authActions.clearMsg,
    },
    dispatch
  );

const RegisterComplete = ({ isError, loading, email, phone, message, register, clearMsg }) => {
  const [full_name, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState({
    full_name: '',
    password: '',
  });
  const [response, setResponse] = useState({
    message: '',
    isError: false,
  });

  useEffect(() => {
    if (!loading && message) {
      setResponse({ message, isError });
      clearMsg();
    }
  }, [message, loading, isError, clearMsg]);

  function handleName(e) {
    const inputValue = e.target.value;
    if (!inputValue) {
      setInputError((prevState) => ({
        ...prevState,
        full_name: 'Nama tidak boleh kosong',
      }));
    } else if (inputValue.length < 3) {
      setInputError((prevState) => ({
        ...prevState,
        full_name: 'Nama lengkap minimal 3 karakter',
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        full_name: '',
      }));
      setFullName(inputValue);
    }
  }

  function handlePassword(e) {
    const inputValue = e.target.value;

    if (!inputValue) {
      setInputError((prevState) => ({
        ...prevState,
        password: 'Password tidak boleh kosong',
      }));
    } else if (inputValue.length < 8) {
      setInputError((prevState) => ({
        ...prevState,
        password: 'Password minimal 8 karakter',
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        password: '',
      }));
      setPassword(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (full_name && password) {
      register({ full_name, password });
    }
  }
  return (
    <div className="register">
      {response.message && <ResponseMessage response={response} setResponse={setResponse} />}
      <div className="header">
        <h1>Belanjaku</h1>
      </div>
      <div className="content container">
        <div className="row">
          <div
            className="logo-wrapper col-md-6"
            style={{
              paddingRight: '3rem',
            }}
          >
            <div style={{ maxWidth: 425 }}>
              <img className="img__cover" src="/assets/images/logo.jpg" alt="Logo" />
              <div className="logo-cap">
                <h3>Jual Beli Mudah Hanya di Belanjaku</h3>
                <div>Gabung dan rasakan kemudahan bertransaksi di Belanjaku</div>
              </div>
            </div>
          </div>
          <div
            className="col-md-6"
            style={{
              paddingLeft: '3rem',
            }}
          >
            <div className="card">
              <div className="head text-center">
                <h3>Daftar dengan {email ? 'Email' : 'Telephone'}</h3>
                <span>{email ? email : phone}</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label htmlFor="full_name">Nama Lengkap</label>
                  <input
                    type="text"
                    name="full_name"
                    onChange={handleName}
                    className="form-control"
                    style={inputError.full_name ? { borderColor: 'rgb(239, 20, 74)' } : {}}
                    autoComplete="off"
                  />
                  <span
                    className="error"
                    style={inputError.full_name ? { color: 'rgb(239, 20, 74)' } : {}}
                  >
                    {inputError.full_name}
                  </span>
                </div>
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handlePassword}
                    onFocus={(e) => {
                      e.target.readOnly = false;
                    }}
                    onBlur={(e) => {
                      e.target.readOnly = true;
                    }}
                    className="form-control"
                    style={inputError.password ? { borderColor: 'rgb(239, 20, 74)' } : {}}
                    readOnly
                    autoComplete="off"
                  />
                  <span
                    className="error"
                    style={inputError.password ? { color: 'rgb(239, 20, 74)' } : {}}
                  >
                    {!inputError.password && !password ? 'Minimal 8 karakter' : inputError.password}
                  </span>
                  <i
                    className={`fa fa-eye${showPassword ? '' : '-slash'}`}
                    aria-hidden="true"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  ></i>
                </div>
                <button
                  type="submit"
                  className={ClassNames('submit-btn', {
                    'is-valid': password && full_name,
                  })}
                  disabled={password && full_name ? false : true}
                >
                  Selesai
                </button>
              </form>
              <div className="disclaimer">
                <div>Dengan mendaftar, saya menyetujui</div>
                <div>
                  <span className="link-word">Syarat dan Ketentuan </span>
                  serta
                  <span className="link-word"> Kebijakan Privasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container">
          <span
            style={{
              borderRight: '1px solid #d8d8d8',
              marginRight: '10px',
              paddingRight: '10px',
            }}
          >
            ©2020, PT Belanjaku
          </span>
          <span className="link-word">Belanjaku Care</span>
        </div>
      </div>
    </div>
  );
};

RegisterComplete.propTypes = {
  isError: PropTypes.bool,
  loading: PropTypes.bool,
  message: PropTypes.string,
  register: PropTypes.func,
  clearMsg: PropTypes.func,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default connect(mapStateToProps, mapActionToProps)(RegisterComplete);
