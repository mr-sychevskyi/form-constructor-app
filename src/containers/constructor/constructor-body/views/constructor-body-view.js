import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { uniqueId, getOptionName } from 'utils';
import { DragDropWrapper } from 'components';
import {
  TYPE_ATTR_OPTIONS as typeAttrOptions
} from '../../constructor-el-config/constructor-el-config-constants';
import FormElementsLibrary from '../constructor-body-constants';

import './constructor-body-view.scss';

const ConstructorBodyView = ({
  constructorBody, currForm, formId, formName, columnsCount, removeFromConstructor, resetConstructorData,
  handleChange, handleIsFormCreated, updateConstructorOrder, openElementConfig, addForm, updateForm,
}) => {
  const handleSubmit = e => {
    e.preventDefault();

    const constructorBodyData = constructorBody.map(element =>
      (element.type
        ? {
          ...element,
          type: element.type === 'text' ? 'text' : getOptionName(typeAttrOptions, element.type)
        }
        : element)
    );

    const action = formId ? updateForm : addForm;
    const formData = {
      id: formId || uniqueId(),
      name: formName,
      fields: constructorBodyData,
    };

    action(formData);
    handleIsFormCreated();
  };

  const isNoChanged = () => {
    const fieldsCompare = constructorBody.map(item => {
      const { id, ...other } = item;

      return other;
    });

    const formData = {
      id: formId,
      name: formName,
      fields: fieldsCompare
    };

    return JSON.stringify(currForm) === JSON.stringify(formData);
  };

  return (
    <>
      <form className="form-list" onSubmit={handleSubmit}>
        <div className="form-views-config">
          <input
            className="form-title"
            name="formName"
            onChange={handleChange}
            value={formName}
            placeholder="Enter form name"
            required
          />

          <div className="column-counts-config" hidden>
            <span>Columns: &nbsp;</span>
            <button className="btn btn-column" type="button" name="columnsCount" value={1} onClick={handleChange}>1
            </button>
            <span>&nbsp; / &nbsp;</span>
            <button className="btn btn-column" type="button" name="columnsCount" value={2} onClick={handleChange}>2
            </button>
          </div>
        </div>
        <DragDropWrapper items={constructorBody} action={updateConstructorOrder} className="form-constructor-fields">
          {constructorBody.map((el, index) => (
            <Draggable key={el.id} draggableId={el.id} index={index}>
              {provided => (
                <div
                  className={`col w-${100 / columnsCount}`}
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
                </div>
              )}
            </Draggable>
          ))}
        </DragDropWrapper>
        <div className="form-controls">
          <button className="btn form__btn" type="button" onClick={() => resetConstructorData()}>Clear</button>
          <button className="btn form__btn" type="submit" disabled={formId && isNoChanged()}>
            {formId ? 'Update form' : 'Create form'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ConstructorBodyView;
