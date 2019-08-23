import React from 'react';
import './select.scss';

const Select = ({
  className, name, label, placeholder, options, defaultOption,
  value = defaultOption, editable = true, onChange
}) => (
  <div className={`form-group ${className || ''}`}>
    <label className="form-group__label" htmlFor={name}>{label}</label>
    <select
      className="form-group__select"
      name={name}
      value={value}
      onChange={onChange}
      disabled={!editable}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.name}</option>
      )}
    </select>
  </div>
);

export default Select;
