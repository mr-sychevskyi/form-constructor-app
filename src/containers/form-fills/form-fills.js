import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormFills } from 'reducers/fills';
import FormFillsView from './views/form-fills-view';

class FormFills extends Component {
  render() {
    return (
      <FormFillsView {...this.props}/>
    );
  }
}

const mapStateToProps = (state, props) => ({
  fills: getFormFills(state, props),
});

const enhance = connect(
  mapStateToProps,
  null
);

export default enhance(FormFills);
