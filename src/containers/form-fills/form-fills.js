import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormFillsView from 'containers/form-fills/views/form-fills-view';
import { getFormFills } from 'reducers/fills';

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
