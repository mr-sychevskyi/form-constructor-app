import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOptionName, uniqueId } from 'utils';
import { makeGetCurrForm, formsLoadedSelector } from 'reducers/forms';
import {
  addFill, updateFill, formFillsSelector, formFillsTotalSelector, fillsSuccessSelector, fillsErrorSelector,
} from 'reducers/fills';
import { setRole } from 'reducers/auth';
import withFormsData from 'hocs/with-forms-data/with-forms-data';
import FormFillPageView from './views/form-fill-page-view';

class FormFillPage extends Component {
  state = {};

  componentDidMount() {
    const { loaded, fillPage, setRole } = this.props;

    setRole('guest');

    if (loaded) {
      fillPage.fields.forEach(item => this.setFormState(
        item.name,
        item.defaultOption || item.checked
      ));
    }
  }

  setFormState = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleChange = e => {
    this.setFormState(e.target.name, e.target.value);
  };

  handleToggleData = e => {
    const { name } = e.target;

    this.setFormState(e.target.name, !this.state[name]);
  };

  resetForm = () => {
    Object.keys(this.state).forEach(item => this.setFormState(item, ''));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { fillPage, formFills, formFillsTotal, addFill, updateFill } = this.props;
    const data = this.state;

    const filledData = fillPage.fields
      .reduce((res, field) => {
        const value = data[field.name];

        return {
          ...res,
          [field.label]: field.options
            ? getOptionName(field.options, data[field.name])
            : value === true && 'true' || value || value === false && 'false' || '―'
        };
      }, {});

    const action = formFillsTotal ? updateFill : addFill;
    const newFill = {
      _id: {
        $oid: fillPage._id.$oid
      },
      fills: [
        ...formFills,
        {
          id: uniqueId(),
          fields: filledData,
        }
      ]
    };

    action(newFill, fillPage._id.$oid);
  };

  render() {
    return (
      <FormFillPageView
        {...this.props}
        data={this.state}
        resetForm={this.resetForm}
        handleChange={this.handleChange}
        handleToggleData={this.handleToggleData}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getCurrForm = makeGetCurrForm();

  return (state, props) => ({
    fillPage: getCurrForm(state, props),
    formFills: formFillsSelector(state, props),
    formFillsTotal: formFillsTotalSelector(state, props),
    loaded: formsLoadedSelector(state),
    success: fillsSuccessSelector(state),
    failure: fillsErrorSelector(state),
  });
};

const enhance = connect(
  makeMapStateToProps,
  {
    addFill,
    updateFill,
    setRole,
  }
);

const FormFillPageHoc = withFormsData(FormFillPage);

const FormFillPageWrapper = props => (
  <div className="form-fill-page-wrapper">
    <div className="container">
      <FormFillPageHoc {...props}/>
    </div>
  </div>
);

export default enhance(FormFillPageWrapper);
