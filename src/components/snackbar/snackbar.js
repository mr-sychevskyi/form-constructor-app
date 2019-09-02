import React from 'react';
import './snackbar.scss';

const Snackbar = ({ title, className }) => (
  <div className="wrapper-snackbar">
    <h2 className={`snackbar ${className ? className : ''}`}>
      {title}
    </h2>
  </div>
);

export default Snackbar;
