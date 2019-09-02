import React, { Component } from 'react';

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

const FormFillsHoc = withThemeWrapper(withFormFillsData(FormFills));

export default FormFillsHoc;
