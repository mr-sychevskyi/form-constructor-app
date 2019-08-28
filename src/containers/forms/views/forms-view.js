import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './forms-view.scss';

const FormsView = ({ forms, fillsTotalList, currCopiedId, handleCopied }) => (
  <>
    {forms.length === 0
      ? <h3 className="info-title 1">No forms are available!</h3>
      : (
        <>
          <div className="forms">
            <h3 className="form-title">Forms list</h3>
            <ul className="forms-list">
              {forms.map(form => {
                const id = form._id.$oid;

                return (
                  <li key={id} className="forms-list-item">
                    <div className="form">
                      <div className="forms-list-info">
                        <span className="forms-list-text forms-list-name">{form.name}</span>
                        <span className="forms-list-text forms-list-bx">Fields: {form.fields.length}</span>
                        <span className="forms-list-text forms-list-bx">
                          <span>Fills: {fillsTotalList[id] || 0}</span>
                        </span>
                        {fillsTotalList[id] && (
                          <Link className="btn btn-link" to={`/fills/${id}`} replace>
                            View fills
                          </Link>
                        )}
                      </div>

                      <div className="forms-list-controls">
                        {/* <Link className="forms-list-text" to={`/forms/active/${id}`}>Link to fill</Link> */}

                        {!fillsTotalList[id] && (
                          <Link className="btn btn-link" title="Edit form" to={`/forms/${id}`} replace>
                            <i className="btn__icon material-icons">edit</i>
                          </Link>
                        )}

                        <CopyToClipboard
                          text={`${window.location.host}/#/forms/active/${id}`}
                          onCopy={() => handleCopied(id)}
                        >
                          <button className="btn btn-link btn-clipboard" type="button">
                            <span className="btn__text">Copy link to fill</span>
                            <i className={`btn__icon material-icons ${currCopiedId === id ? 'copied' : ''}`}>
                              done
                            </i>
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Link className="btn form__btn" to="/forms/new">Create form</Link>
        </>
      )}
  </>
);

export default FormsView;
