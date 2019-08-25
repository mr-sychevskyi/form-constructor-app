import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeGetCurrForm } from 'reducers/forms';
import { addFill, updateFill, getFormFillsTotal } from 'reducers/fills';
import { setRole } from 'reducers/auth';
import FormFillPageView from './views/form-fill-page-view';

class FormFillPage extends Component {
  state = {
    data: {},
    successful: false,
  };

  componentDidMount() {
    this.props.setRole('guest');
    this.props.fillPage.fields.forEach(item => this.handleChangeDataState(
      item.name,
      item.defaultOption || item.checked
    ));
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

  render() {
    return (
      <FormFillPageView
        {...this.props}
        {...this.state}
        resetForm={this.resetForm}
        handleChange={this.handleChange}
        handleToggleData={this.handleToggleData}
        toggleValue={this.toggleValue}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getCurrForm = makeGetCurrForm();

  return (state, props) => ({
    fillPage: getCurrForm(state, props),
    formFillsTotal: getFormFillsTotal(state, props),
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

export default enhance(FormFillPage);
