import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Header } from 'components';

import './forms-view.scss';

const FormsView = ({ forms, fillsCountList, currCopiedId, handleCopied }) => (
  <>
    <Header/>

    <main className="main">
      <div className="container ">
        <div className="forms">
          <h3 className="forms-list-title">Forms list</h3>
          <ul className="forms-list">
            {forms.map(form => (
              // _id.$oid
              <li key={form.id} className="forms-list-item">
                <div className="form">
                  <div className="forms-list-info">
                    <span className="forms-list-text forms-list-name">{form.name}</span>
                    <span className="forms-list-text forms-list-bx">Fields: {form.fields.length}</span>
                    <span className="forms-list-text forms-list-bx">
                      <span>Fills: {fillsCountList[form.id] || 0}</span>
                      <Link className="btn btn-link" to={`/fills/${form.id}`} replace>View fills</Link>
                    </span>
                  </div>

                  <div className="forms-list-controls">
                    {/* <Link className="forms-list-text" to={`/forms/active/${form.id}`}>Link to fill</Link> */}

                    {!fillsCountList[form.id] && (
                      <Link className="btn btn-link" to={`/forms/${form.id}`} title="Edit form" replace>
                        <i className="btn__icon material-icons">edit</i>
                      </Link>
                    )}

                    <CopyToClipboard
                      text={`${window.location.host}/#/forms/active/${form.id}`}
                      onCopy={() => handleCopied(form.id)}
                    >
                      <button className="btn btn-link btn-clipboard" type="button">
                        <span className="btn__text">Copy link to fill</span>
                        <i
                          className={`btn__icon material-icons ${currCopiedId === form.id ? 'copied' : ''}`}
                        >done
                        </i>
                      </button>
                    </CopyToClipboard>

                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn form__btn" to="/forms/new">Create form</Link>
      </div>
    </main>
  </>
);

export default FormsView;
