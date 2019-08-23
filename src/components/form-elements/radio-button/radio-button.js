import React from 'react';
import './radio-button.scss';

const RadioButton = ({ className, name, label, options, defaultOption, value = defaultOption, editable, onChange }) => (
  <div className={`radio-button-group ${className || ''}`}>
    <h4 className="form-group__label">{label}</h4>
    {options.map(option => (
      <label className="radio-button" key={option.value}>
        <input
          className="radio-button__input"
          type="radio"
          name={name}
          value={option.value}
          checked={+value === option.value}
          onChange={onChange}
          readOnly={!editable}
        />
        <span className="radio-button__checkmark"/>
        <span className="radio-button__option">{option.name}</span>
      </label>
    ))}
  </div>
);

export default RadioButton;
