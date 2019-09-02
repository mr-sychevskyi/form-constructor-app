import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './forms-view.scss';

const FormsView = ({ forms, filterValue, fillsTotalList, currCopiedId, handleChange, handleCopied }) => (
  <>
    {forms.length === 0
      ? <h2 className="info-default">No forms are available!</h2>
      : (
        <>
          <section className="section forms">
            <div className="forms-toolbar">
              <h3 className="section-title">Forms list</h3>
              <form className="forms-search">
                <i className="forms-search__icon material-icons">search</i>
                <input
                  className="forms-search__input"
                  type="text"
                  placeholder="Search"
                  value={filterValue}
                  onChange={handleChange}
                />
              </form>
            </div>
            <ul className="forms-list">
              {forms.map(form => {
                const id = form._id.$oid;

                return (
                  <li key={id} className="forms-list-item">
                    <div className="form">
                      <div className="form-info">
                        <span className="form-name">{form.name}</span>
                        <span className="form-info-text form-bx">
                          Fields: <span className="form-info-total">{form.fields.length}</span>
                        </span>
                        <span className="form-info-text form-bx">
                          Fills: <span className="form-info-total">{fillsTotalList[id] || 0}</span>
                        </span>
                        {fillsTotalList[id] && (
                          <Link className="btn btn-link" to={`/fills/${id}`} replace>
                            View fills
                          </Link>
                        )}
                      </div>

                      <div className="form__controls">
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
          </section>
          <Link className="btn btn-primary btn-primary_size_m" to="/forms/new">Create form</Link>
        </>
      )}
  </>
);

export default FormsView;
