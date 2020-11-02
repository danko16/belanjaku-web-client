import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import QS from 'query-string';
import { Link } from 'react-router-dom';
import { SERVER_DOMAIN } from '../../utils/api';
import { authActions } from '../../redux/reducers/auth';
import ResponseMessage from '../../shared/response_message';

import '../css/auth.css';

const mapStateToProps = (state) => ({
  isError: state.auth.is_error,
  loading: state.auth.loading,
  message: state.auth.message,
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      reqLogin: authActions.reqLogin,
      login: authActions.login,
      clearMsg: authActions.clearMsg,
    },
    dispatch
  );

const Login = ({ isError, loading, message, reqLogin, login, clearMsg, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState({
    email: '',
    password: '',
  });
  const [response, setResponse] = useState({
    message: '',
    isError: false,
  });

  useEffect(() => {
    const query = history.location.search;
    const parseQuery = QS.parse(query);
    if (
      query &&
      parseQuery.key &&
      parseQuery.exp &&
      parseQuery.id &&
      parseQuery.type &&
      parseQuery.full_name &&
      (parseQuery.email || parseQuery.phone)
    ) {
      login({
        login_token: {
          key: parseQuery.key,
          exp: parseQuery.exp,
        },
        user: {
          id: parseQuery.id,
          full_name: parseQuery.full_name,
          email: parseQuery.email,
          phone: parseQuery.phone,
          avatar: parseQuery.avatar,
          type: parseQuery.type,
        },
      });

      history.push('/');
    }
  }, [history, login]);

  useEffect(() => {
    if (!loading && message) {
      setResponse({ message, isError });
      clearMsg();
    }
  }, [message, loading, isError, clearMsg]);

  function handleEmail(e) {
    const inputValue = e.target.value;

    // eslint-disable-next-line
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!inputValue) {
      setEmail('');
      setInputError((prevState) => ({
        ...prevState,
        email: 'Email harus diisi',
      }));
    } else if (!inputValue.match(emailFormat)) {
      setEmail('');
      setInputError((prevState) => ({
        ...prevState,
        email: 'Format Email Salah',
      }));
    } else {
      setInputError((prevState) => ({
        ...prevState,
        email: '',
      }));
      setEmail(inputValue);
    }
  }

  function handlePassword(e) {
    const inputValue = e.target.value;

    const passwordFormat = /^(?=.*[a-zA-Z]).{8,}$/;

    if (inputValue.length < 8) {
      setInputError((prevState) => ({
        ...prevState,
        password: 'Password minimal 8 karakter',
      }));
    } else if (!inputValue.match(passwordFormat)) {
      setInputError((prevState) => ({
        ...prevState,
        password: 'Password harus memiliki huruf alfabet',
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
    if (email && password) {
      reqLogin({
        email,
        password,
        type: 'email',
        remember_me: false,
      });
    }
  }
  return (
    <div className="auth">
      {response.message && <ResponseMessage response={response} setResponse={setResponse} />}
      <div className="header">
        <div className="link-anchor">
          <Link to="/" />
          <img className="logo" src="/assets/icons/belanjaku.png" alt="logo" />
        </div>
      </div>
      <div className="content container">
        <div className="row">
          <div className="logo-wrapper col-lg-6">
            <div style={{ maxWidth: 425 }}>
              <img className="img__cover" src="/assets/images/logo.jpg" alt="Logo" />
              <div className="logo-cap">
                <h3>Jual Beli Mudah Hanya di Belanjaku</h3>
                <div>Gabung dan rasakan kemudahan bertransaksi di Belanjaku</div>
              </div>
            </div>
          </div>
          <div className="card-wrapper col-lg-6">
            <div className="card">
              <div className="head text-center">
                <h3>Masuk Akun</h3>
                <span>Belum punya akun Belanjaku?</span>
                <Link to="/register" className="link-word">
                  {' '}
                  Daftar
                </Link>
              </div>
              <div className="oauth-wrapper">
                <div className="oauth link-anchor">
                  <a href={`${SERVER_DOMAIN}/user/auth/facebook`}>
                    <div className="d-none">Link Anchor</div>
                  </a>
                  <img src="/assets/icons/ic_facebook.png" alt="facebook" />
                  <span>Facebook</span>
                </div>
                <div className="oauth link-anchor">
                  <a href={`${SERVER_DOMAIN}/user/auth/google`}>
                    <div className="d-none">Link Anchor</div>
                  </a>
                  <img src="/assets/icons/ic_google.png" alt="google" />
                  <span>Google</span>
                </div>
              </div>
              <span className="auth-separator">Atau Masuk dengan</span>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email_phone">Email</label>
                  <input
                    type="text"
                    name="email_phone"
                    onChange={handleEmail}
                    className="form-control"
                    style={inputError.email ? { borderColor: 'rgb(239, 20, 74)' } : {}}
                  />
                  <span
                    className="error"
                    style={inputError.email ? { color: 'rgb(239, 20, 74)' } : {}}
                  >
                    {!inputError.email && !email ? 'Example: email@belanjaku.id' : inputError.email}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handlePassword}
                    className="form-control"
                    style={inputError.password ? { borderColor: 'rgb(239, 20, 74)' } : {}}
                  />
                  <span
                    className="error"
                    style={inputError.password ? { color: 'rgb(239, 20, 74)' } : {}}
                  >
                    {!inputError.password && !password ? 'Minimal 8 Karakter' : inputError.password}
                  </span>
                </div>
                <button
                  className={ClassNames('submit-btn', {
                    'is-valid': email && password,
                  })}
                  disabled={email && password ? false : true}
                >
                  Masuk
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

Login.propTypes = {
  isError: PropTypes.bool,
  loading: PropTypes.bool,
  message: PropTypes.string,
  login: PropTypes.func,
  reqLogin: PropTypes.func,
  clearMsg: PropTypes.func,
  history: PropTypes.object,
};

export default connect(mapStateToProps, mapActionToProps)(Login);
