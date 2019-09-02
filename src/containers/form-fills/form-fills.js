import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeGetCurrForm } from 'reducers/forms';
import withFormFillsData from 'hocs/with-form-fills-data/with-form-fills-data';
import withThemeWrapper from 'hocs/with-theme-wrapper/with-theme-wrapper';
import FormFillsView from './views/form-fills-view';

class FormFills extends Component {
  render() {
    return (
      <FormFillsView {...this.props}/>
    );
  }
}

const makeMapStateToProps = () => {
  const getCurrForm = makeGetCurrForm();

  return (state, props) => ({
    currForm: getCurrForm(state, props),
  });
};

const enhance = connect(
  makeMapStateToProps,
  null
);

const FormFillsHoc = withThemeWrapper(withFormFillsData(FormFills));

export default enhance(FormFillsHoc);
