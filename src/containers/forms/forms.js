import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fillsTotalListSelector } from 'reducers/fills';
import withFormsData from 'hocs/with-forms-data/with-forms-data';
import withThemeWrapper from 'hocs/with-theme-wrapper/with-theme-wrapper';
import FormsView from './views/forms-view';

class Forms extends Component {
  state = {
    currCopiedId: null
  };

  handleCopied = id => {
    this.setState({
      currCopiedId: id
    });
  };

  render() {
    const { currCopiedId } = this.state;

    return (
      <FormsView
        {...this.props}
        currCopiedId={currCopiedId}
        handleCopied={this.handleCopied}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  fillsTotalList: fillsTotalListSelector(state),
});

const enhance = connect(
  mapStateToProps,
  {}
);

const FormsHoc = withThemeWrapper(withFormsData(Forms));

export default enhance(FormsHoc);
