import React from 'react';

import { getOptionName } from 'utils';
import FormElementsLibrary from 'containers/constructor/constructor-body/constructor-body-constants';
import './form-fill-page-view.scss';

const FormFillPageView = ({
  data, fillPage, successful, formFillsTotal, resetForm, handleChange,
  handleToggleData, addFill, updateFill, toggleValue
}) => {
  const handleSubmit = e => {
    e.preventDefault();

    const fieldsData = fillPage.fields
      .reduce((res, field) => ({
        ...res,
        [field.label]: field.options
          ? getOptionName(field.options, data[field.name])
          : data[field.name]
      }), {});

    const action = formFillsTotal ? updateFill : addFill;
    const fillData = {
      id: fillPage.id,
      fields: fieldsData
    };

    action(fillData);
    toggleValue('successful');
  };

  return (
    <div className="container">
      {successful
        ? <div className="wrapper__snackbar snackbar">Successful!</div>
        : (
          <div className="m-5">
            <h2 className="form-title">{fillPage.name}</h2>
            <form className="form-fill-page" onSubmit={handleSubmit}>
              {fillPage.fields.map(el => (
                <div className={`col w-${100 / 1}`} key={el.name}>
                  <FormElementsLibrary
                    el={el}
                    value={data}
                    onChange={handleChange}
                    onToggle={handleToggleData}
                    editable
                  />
                </div>
              ))}
              <div className="form-controls">
                <button className="btn form__btn" type="button" onClick={resetForm}>Reset</button>
                <button className="btn form__btn" type="submit">Save</button>
              </div>
            </form>
          </div>
        )}
    </div>
  );
};

export default FormFillPageView;
