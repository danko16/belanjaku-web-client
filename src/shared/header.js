import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';

import './css/header.css';

const Header = () => {
  const [navCollapse, setNavCollapse] = useState(false);
  const navbarRef = useRef();
  const navbarCollapse = useRef();
  const extraLinkRef = useRef();
  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll() {
    if (window.pageYOffset > 32) {
      navbarRef.current.classList.add('sticky');
      navbarCollapse.current.classList.add('sticky-nav-collapse');
      document.querySelector('.main').style.paddingTop = '44px';
    } else {
      navbarRef.current.classList.remove('sticky');
      navbarCollapse.current.classList.remove('sticky-nav-collapse');
      document.querySelector('.main').style.paddingTop = '0';
    }
  }
  return (
    <div className="header">
      <div ref={extraLinkRef} className="extra-link">
        <div>
          <i className="fa fa-mobile" aria-hidden="true"></i>
          <span>Download Belanjaku App</span>
        </div>
      </div>
      <div ref={navbarRef} className="navbar navbar-expand-lg">
        <div className="link-anchor navbar-brand">
          <Link to="/" />
          <img className="img__cover" src="/assets/icons/belanjaku.png" alt="logo" />
        </div>
        <div className="category">
          <i className="fa fa-th-large" aria-hidden="true"></i>
          <span>Kategori</span>
        </div>
        <div className="search">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Cari Barang di Sini"
              aria-label="Cari Barang di Sini"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="cart">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        </div>
        <div className="auth-link">
          <Link to="/login" className="login">
            Masuk
          </Link>
          <Link to="/register" className="register">
            Daftar
          </Link>
        </div>
        <div
          className="toggler"
          onClick={() => {
            setNavCollapse((prevState) => !prevState);
          }}
        >
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
      <div ref={navbarCollapse} className={ClassNames('navbar-collapse', { show: navCollapse })}>
        <div className="link-anchor navbar-brand">
          <Link to="/" />
          <img className="img__cover" src="/assets/icons/belanjaku.png" alt="logo" />
        </div>
        <div className="category">
          <i className="fa fa-th-large" aria-hidden="true"></i>
          <span>Kategori</span>
        </div>
        <div className="auth-link">
          <Link to="/login" className="login">
            Masuk
          </Link>
          <Link to="/register" className="register">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
