import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormFillsTotalList } from 'reducers/fills';
import { getForms } from 'reducers/forms';
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
    const { forms } = this.props;

    return (
      <>
        {forms.length === 0
          ? <h3 className="info-title 1">No forms are available!</h3>
          : (
            <FormsView
              {...this.props}
              currCopiedId={currCopiedId}
              handleCopied={this.handleCopied}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  forms: getForms(state),
  fillsTotalList: getFormFillsTotalList(state),
});

const enhance = connect(
  mapStateToProps,
  {}
);

export default enhance(Forms);
