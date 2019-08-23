import React from 'react';

import './constructor-elements-view.scss';

const ConstructorElementsView = ({ data, isElementsLimitReached, openElementConfig }) => (
  <>
    <h2 className="form-elements-title">Form elements:</h2>
    {isElementsLimitReached && <span className="info-title">No more form fields can be added!</span>}

    <ul className="form-elements">
      {data.map(el => (
        <li key={el.el} className="list-item">
          <button
            className="btn"
            type="button"
            disabled={isElementsLimitReached}
            onClick={() => openElementConfig(el)}
          >
            <span className="list-item-info">
              <i className="btn__icon material-icons">{el.icon}</i>
              <span className="btn__text">{el.el}</span>
            </span>
            <i className="list-item-icon material-icons">add</i>
          </button>
        </li>
      ))}
    </ul>
  </>
);


export default ConstructorElementsView;
