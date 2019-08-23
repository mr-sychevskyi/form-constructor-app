import React from 'react';

const InputWithButton = ({ children, className, type, name, placeholder, value, onChange, onClick }) => (
  <div className={`form-group ${className || ''}`}>
    <button
      className="btn form-group__btn"
      type="button"
      disabled={!value}
      onClick={onClick}
    >
      <span className="btn__text">Add</span>
      <i className="btn__icon material-icons">add</i>
    </button>
    <input
      className="form-group__input"
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
    />
    {children}
  </div>
);

export default InputWithButton;
