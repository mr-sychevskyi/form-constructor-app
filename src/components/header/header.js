import React from 'react';

import './header.scss';

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <a className="header-logo" href="/" aria-label="button logo brand">
          <i className="icon material-icons">extension</i>
        </a>
        <h3 className="header-title">Form Constructor</h3>
      </div>
    </div>
  </header>
);

export default Header;
