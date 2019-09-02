import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DragDropWrapper } from 'components';
import FormElementsLibrary from '../constructor-body-constants';

import './constructor-body-view.scss';

const ConstructorBodyView = ({
  constructorBody, formId, formName, currForm, removeFromConstructor, resetConstructorData,
  handleChange, handleSubmit, updateConstructorOrder, openElementConfig,
}) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (formId) {
      const formData = {
        _id: { $oid: formId },
        name: formName,
        fields: constructorBody,
      };

      setDisabled(JSON.stringify(currForm) === JSON.stringify(formData));
    }
  });

  return (
    <form className="constructor-body" onSubmit={handleSubmit}>
      <div className="constructor-body-config">
        <input
          className="constructor-body-title"
          name="formName"
          onChange={handleChange}
          value={formName}
          placeholder="Enter form name"
          required
        />
      </div>
      <DragDropWrapper items={constructorBody} action={updateConstructorOrder} className="constructor-body-fields">
        {constructorBody.map((el, index) => (
          <Draggable key={el.id} draggableId={el.id} index={index}>
            {provided => (
              <li
                className="col w-100"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="form-group-body">
                  <FormElementsLibrary el={el} editable={false}/>
                </div>

                <div className="form-group-controls">
                  <button className="btn btn-icon" type="button" onClick={() => openElementConfig(el)}>
                    <i className="material-icons">settings</i>
                  </button>
                  <button className="btn btn-icon" type="button" onClick={() => removeFromConstructor(el.id)}>
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </li>
            )}
          </Draggable>
        ))}
      </DragDropWrapper>
      <div className="form-controls">
        <button className="btn btn-primary btn-primary_size_s" type="button" onClick={resetConstructorData}>
          Clear
        </button>
        <button className="btn btn-primary btn-primary_size_m" type="submit" disabled={disabled}>
          {formId ? 'Update form' : 'Create form'}
        </button>
      </div>
    </form>
  );
};

export default ConstructorBodyView;
