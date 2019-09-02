import React from 'react';
import './constructor-elements-view.scss';

const ConstructorElementsView = ({ data, isElementsLimitReached, openElementConfig }) => (
  <>
    <h3 className="form-constructor-elements-title">Form elements:</h3>
    {isElementsLimitReached &&
      <div className="px-4"><span className="info-error">No more form elements can be added!</span></div>
    }

    <ul className="form-constructor-elements-list">
      {data.map(el => (
        <li key={el.el} className="list-item">
          <button
            className="btn btn-element"
            type="button"
            disabled={isElementsLimitReached}
            onClick={() => openElementConfig(el)}
          >
            <span className="btn-element-info">
              <i className="btn__icon material-icons">{el.icon}</i>
              <span className="btn__text">{el.el}</span>
            </span>
            <i className="btn-element-icon material-icons">add</i>
          </button>
        </li>
      ))}
    </ul>
  </>
);

export default ConstructorElementsView;
