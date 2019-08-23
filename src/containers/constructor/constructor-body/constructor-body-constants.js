import React from 'react';
import { Input, CheckBoxGroup, RadioButton, Select, TextArea } from 'components';

const FormElementsLibrary = ({ el, editable, value, onChange, onToggle }) => (
  <>
    {el.el === 'input' && (
      <Input
        type={el.type}
        name={el.name}
        label={el.label}
        placeholder={el.placeholder}
        required={el.required}
        editable={editable}
        value={value ? value[el.name] : ''}
        onChange={onChange}
      />
    )}

    {el.el === 'checkbox' && (
      <CheckBoxGroup
        name={el.name}
        label={el.label}
        checked={value ? value[el.name] : el.checked}
        value={value ? value[el.name] : value}
        editable={editable}
        onChange={onToggle}
      />
    )}

    {el.el === 'radio' && (
      <RadioButton
        name={el.name}
        label={el.label}
        options={el.options}
        defaultOption={el.defaultOption}
        editable={editable}
        value={value ? value[el.name] : value}
        onChange={onChange}
      />
    )}

    {el.el === 'select' && (
      <Select
        name={el.name}
        label={el.label}
        placeholder={el.placeholder}
        options={el.options}
        defaultOption={el.defaultOption}
        editable={editable}
        value={editable ? value[el.name] : value}
        onChange={onChange}
      />
    )}

    {el.el === 'textarea' && (
      <TextArea
        type={el.type}
        name={el.name}
        label={el.label}
        placeholder={el.placeholder}
        rows={el.rows}
        required={el.required}
        editable={editable}
        value={value ? value[el.name] : ''}
        onChange={onChange}
      />
    )}
  </>
);

export default FormElementsLibrary;
