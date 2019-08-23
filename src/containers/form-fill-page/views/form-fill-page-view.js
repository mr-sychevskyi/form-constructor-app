import React from 'react';

import FormElementsLibrary from 'containers/constructor/constructor-body/constructor-body-constants';
import './form-fill-page-view.scss';

const FormFillPageView = ({
  data, fillPage, successful, formFillsCount, resetForm, handleChange,
  handleToggleData, addFill, updateFill, toggleValue
}) => {
  const handleSubmit = e => {
    e.preventDefault();

    const nData = fillPage.fields
      .reduce((res, field) => ({
        ...res,
        [field.label]: field.options
          ? field.options.filter(item => item.value === data[field.name]).name
          : data[field.name]
      }), {});

    const action = formFillsCount ? updateFill : addFill;
    const fillData = {
      id: fillPage.id,
      fields: nData
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
