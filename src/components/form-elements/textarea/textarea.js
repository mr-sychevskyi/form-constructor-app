import React from 'react';
import './textarea.scss';

const TextArea = ({ className, name, label, placeholder, required, editable = true, rows, value, onChange }) => (
  <div className={`form-group ${className || ''}`}>
    <label className="form-group__label" htmlFor={name}>{label}</label>
    <textarea
      className="form-group__textarea"
      id={name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      required={required}
      disabled={!editable}
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

export default TextArea;
