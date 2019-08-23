import React from 'react';
import { CheckBox } from 'components';

const CheckBoxGroup = ({ className, name, label, checked, editable, onChange }) => (
  <div className={`checkbox-group ${className || ''}`}>
    <h4 className="form-group__label">{label}</h4>
    <CheckBox
      name={name}
      checked={checked}
      editable={editable}
      onChange={onChange}
    />
  </div>
);


export default CheckBoxGroup;
