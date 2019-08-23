import React from 'react';
import './checkbox.scss';

const CheckBox = ({ name, editable, checked = false, onChange }) => (
  <label className="checkbox">
    <input
      className="checkbox__input"
      type="checkbox"
      name={name}
      checked={checked}
      readOnly={!editable}
      onChange={onChange}
    />
    <span className="checkbox__toggler"/>
  </label>
);

export default CheckBox;
