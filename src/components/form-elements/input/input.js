import React from 'react';
import './input.scss';

const Input = ({
  children, className, type, name, label, placeholder, title, pattern, required, editable = true, value, onChange
}) => (
  <div className={`form-group ${className || ''}`}>
    <label className="form-group__label" htmlFor={name}>{label}</label>
    <input
      className="form-group__input"
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      title={title}
      pattern={pattern}
      required={required}
      disabled={!editable}
      value={value || ''}
      onChange={onChange}
    />
    {children}
  </div>
);

export default Input;
