import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'components';

import './form-fills-view.scss';

const FormFillsView = ({ fills }) => (
  <>
    <Header/>
    <main className="main">
      <div className="container">
        <h2 className="form-title">Form fillings</h2>
        {!fills.length
          ? <h3>No fillings!</h3>
          : (
            <table className="fills form-fills">
              <thead className="thead">
                <tr className="tr">
                  {Object.keys(fills[0].fields).map((item, index) => (
                    <th key={index} className="th">{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="tbody">
                {fills.map(fill => (
                  <tr key={fill.id} className="tr">
                    {Object.values(fill.fields).map((item, index) => (
                      <td key={index} className="td">
                        {item === true && 'true' || item === false && 'false'}
                        {item ? item : item !== false && '―'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        <div className="app-navigation">
          <Link className="btn btn-go-back" to="/">
            <i className="btn__icon material-icons">keyboard_backspace</i>
            <span className="btn__text">Go back</span>
          </Link>
        </div>
      </div>
    </main>
  </>
);

export default FormFillsView;
