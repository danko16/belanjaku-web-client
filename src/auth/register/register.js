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
  message: state.auth.message,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      register: authActions.reqRegister,
      clearMsg: authActions.clearError,
    },
    dispatch
  );

const Register = ({ isError, loading, message, register, clearMsg }) => {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState('');
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

  function handleInput(e) {
    const inputValue = e.target.value;

    // eslint-disable-next-line
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!inputValue) {
      setEmail('');
      setInputError('Email harus diisi');
    } else if (!inputValue.match(emailFormat)) {
      setEmail('');
      setInputError('Format email salah');
    } else {
      setEmail(inputValue);
      setInputError('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      register({
        email,
        type: 'email',
      });
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
                <h3>Daftar Sekarang</h3>
                <span>Sudah punya akun Belanjaku?</span>
                <span className="link-word"> Masuk</span>
              </div>
              <div className="oauth-wrapper">
                <div className="oauth">Facebook</div>
                <div className="oauth">Google</div>
              </div>
              <span className="auth-separator">Atau daftar dengan</span>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email_phone">Email</label>
                  <input
                    type="text"
                    name="email_phone"
                    onChange={handleInput}
                    autoComplete="off"
                    className="form-control"
                    style={inputError ? { borderColor: 'rgb(239, 20, 74)' } : {}}
                  />
                  <span className="error" style={inputError ? { color: 'rgb(239, 20, 74)' } : {}}>
                    {inputError ? inputError : 'Example: email@belanjaku.id'}
                  </span>
                </div>
                <button
                  className={ClassNames('submit-btn', {
                    'is-valid': email,
                  })}
                  disabled={email ? false : true}
                >
                  Daftar
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

Register.propTypes = {
  isError: PropTypes.bool,
  loading: PropTypes.bool,
  message: PropTypes.string,
  register: PropTypes.func,
  clearMsg: PropTypes.func,
};

export default connect(mapStateToProps, mapActionToProps)(Register);
