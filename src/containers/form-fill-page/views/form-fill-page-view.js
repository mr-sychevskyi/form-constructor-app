import React from 'react';
import FormElementsLibrary from 'containers/constructor/constructor-body/constructor-body-constants';
import { Snackbar } from 'components';
import './form-fill-page-view.scss';

const FormFillPageView = ({
  data, fillPage, success, failure, resetForm, handleChange, handleToggleData, handleSubmit
}) => (
  <>
    {!!failure && <Snackbar className="is-error" title={failure.message}/>}
    {!!success && <Snackbar className="is-success" title="Successful!"/>}

    {!success && !failure && (
      <div className="form-fill-page">
        <h2 className="section-title">{fillPage.name}</h2>
        <form className="form-fill-page-body" onSubmit={handleSubmit}>
          {fillPage.fields.map(el => (
            <div key={el.name} className="col w-100">
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
            <button className="btn btn-primary btn-primary_size_s" type="button" onClick={resetForm}>Reset</button>
            <button className="btn btn-primary btn-primary_size_m" type="submit">Save</button>
          </div>
        </form>
      </div>
    )}
  </>
);

export default FormFillPageView;
