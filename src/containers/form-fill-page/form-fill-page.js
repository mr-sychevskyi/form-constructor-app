import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getOptionName, uniqueId } from 'utils';
import { makeGetCurrForm, formsLoadedSelector } from 'reducers/forms';
import { addFill, updateFill, formFillsSelector, formFillsTotalSelector } from 'reducers/fills';
import { setRole } from 'reducers/auth';
import withFormsData from 'hocs/with-forms-data/with-forms-data';
import FormFillPageView from './views/form-fill-page-view';

class FormFillPage extends Component {
  state = {
    data: {},
    successful: false,
  };

  componentDidMount() {
    const { loaded, fillPage } = this.props;

    this.props.setRole('guest');

    if (loaded) {
      fillPage.fields.forEach(item => this.handleChangeDataState(
        item.name,
        item.defaultOption || item.checked
      ));
    }
  }

  toggleValue = value => {
    this.setState(prevState => ({
      [value]: !prevState[value]
    }));
  };

  handleChangeDataState = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  handleChange = e => {
    this.handleChangeDataState(e.target.name, e.target.value);
  };

  handleToggleData = e => {
    const { name } = e.target;
    const { data } = this.state;

    this.handleChangeDataState(name, !data[name]);
  };

  resetForm = () => {
    Object.keys(this.state.data).forEach(item => this.handleChangeDataState(item, ''));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { fillPage, formFills, formFillsTotal, addFill, updateFill } = this.props;
    const { data } = this.state;

    const filledData = fillPage.fields
      .reduce((res, field) => ({
        ...res,
        [field.label]: field.options
          ? getOptionName(field.options, data[field.name])
          : data[field.name] || ''
      }), {});

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
    this.toggleValue('successful');
  };

  render() {
    return (
      <FormFillPageView
        {...this.props}
        {...this.state}
        resetForm={this.resetForm}
        toggleValue={this.toggleValue}
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

export default enhance(FormFillPageHoc);
