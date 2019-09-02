import React, { useState, useEffect } from 'react';

import { CheckBox, Input, InputWithButton, Select } from 'components';
import {
  ATTRIBUTES_CONFIG as attrConfig, TYPE_ATTR_OPTIONS as typeAttrOptions
} from '../constructor-el-config-constants';

import './constructor-el-config-view.scss';

const ConstructorElConfigView = ({
  data, data: { options }, currEl, newOption, isNameExists, isSelectEmpty, handleElementConfigOpen,
  addOption, removeOption, handleChange, handleChangeData, handleToggleData, handleSubmit,
}) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => setDisabled(JSON.stringify(currEl) === JSON.stringify(data)));

  return (
    <form className="form-el-config" onSubmit={handleSubmit} tabIndex="-1">
      <h3 className="form-title">{data.el} element config</h3>

      <Input
        className="form-group-inline"
        type="text"
        name="name"
        label="Name"
        placeholder="Enter name"
        required
        pattern="^[A-Za-z](?:_?[A-Za-z0-9]+)*$"
        title="Name should begin with a letter, no spaces.
          Letters, digits, and underscores are allowed after the first character."
        value={data.name}
        onChange={handleChangeData}
      >
        {isNameExists && (
          <span className="info-error-input">
            <i className="material-icons">error_outline</i>
            <span className="info-error-input-text">This name already exists!</span>
          </span>
        )}
      </Input>

      <Input
        className="form-group-inline"
        type="text"
        name="label"
        label="Label"
        placeholder="Enter label"
        required
        value={data.label}
        onChange={handleChangeData}
      />

      {attrConfig.placeholder.includes(data.el) && (
        <Input
          className="form-group-inline"
          type="text"
          name="placeholder"
          label="Placeholder"
          placeholder="Enter placeholder"
          required
          value={data.placeholder}
          onChange={handleChangeData}
        />
      )}

      {attrConfig.type.includes(data.el) && (
        <Select
          className="form-group-inline"
          name="type"
          label="Input type"
          placeholder="Input type"
          value={data.type}
          options={typeAttrOptions}
          defaultOption={0}
          onChange={handleChangeData}
        />
      )}

      {attrConfig.required.includes(data.el) && (
        <div className="form-group form-group-inline">
          <div className="form-group__label">
            <CheckBox checked={data.required} name="required" onChange={handleToggleData}/>
          </div>
          <div className="flex-responsive">
            <span className="form__desc">Required</span>
          </div>
        </div>
      )}

      {attrConfig.rows.includes(data.el) && (
        <Input
          className="form-group-inline"
          type="text"
          name="rows"
          label="Rows"
          placeholder="Enter rows"
          required
          value={data.rows}
          onChange={handleChangeData}
        />
      )}

      {attrConfig.checked.includes(data.el) && (
        <div className="form-group form-group-inline">
          <div className="form-group__label">
            <CheckBox checked={data.checked} name="checked" onChange={handleToggleData}/>
          </div>
          <div className="flex-responsive">
            <span className="form__desc">Checked</span>
          </div>
        </div>
      )}

      {attrConfig.options.includes(data.el) && (
        <div className="select-config">
          <h4 className="select-config-title">Element options</h4>

          <Input
            className="form-group-inline"
            type="text"
            name="defaultOption"
            label="Default"
            placeholder="Enter default option"
            pattern="^(0|[1-9][0-9]*)$"
            title="The default value must be a digit(option index)"
            required
            value={data.defaultOption}
            onChange={handleChangeData}
          />

          <InputWithButton
            className="form-group-inline"
            type="text"
            name="newOption"
            label="Add option"
            placeholder="Enter option"
            value={newOption}
            onChange={handleChange}
            onClick={addOption}
          >
            {isSelectEmpty && (
              <span className="info-error-input">
                <i className="material-icons">error_outline</i>
                <span className="info-error-input-text">Need at least one options!</span>
              </span>
            )}
          </InputWithButton>

          {options.length > 0 && (
            <>
              <p className="arrow-down">&#x2193;</p>

              <ul className="options-list">
                {options.map(item => (
                  <li key={item.value} className="options-list-item">
                    <span>{item.name} (Option index: {item.value})</span>
                    <button id={item.value} type="button" onClick={removeOption}>
                      <i className="material-icons">delete</i>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="form-controls">
        <button className="btn btn-primary btn-primary_size_xs" type="button" onClick={handleElementConfigOpen}>
          Cancel
        </button>
        <button className="btn btn-primary btn-primary_size_s" type="submit" disabled={disabled}>Submit</button>
      </div>
    </form>
  );
};

export default ConstructorElConfigView;
