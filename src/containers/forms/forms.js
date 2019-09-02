import React, { Component } from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import { formsSuccessSelector, resetSuccess } from 'reducers/forms';
import { fillsTotalListSelector } from 'reducers/fills';
import withFormsData from 'hocs/with-forms-data/with-forms-data';
import withThemeWrapper from 'hocs/with-theme-wrapper/with-theme-wrapper';
import FormsView from './views/forms-view';

class Forms extends Component {
  state = {
    currCopiedId: null,
  };

  handleCopied = id => {
    this.setState({
      currCopiedId: id
    });
  };

  handleClose = () => {
    this.props.resetSuccess();
  };

  render() {
    const { currCopiedId } = this.state;
    const { success } = this.props;

    return (
      <>
        <FormsView
          {...this.props}
          currCopiedId={currCopiedId}
          handleCopied={this.handleCopied}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={!!success}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': 'message-id', }}
          message={(
            <span className="snackbar is-success">
              {success === 'FORMS_ADD_SUCCESS' && 'Form created!'}
              {success === 'FORMS_UPDATE_SUCCESS' && 'Form updated!'}
            </span>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  fillsTotalList: fillsTotalListSelector(state),
  success: formsSuccessSelector(state),
});

const enhance = connect(
  mapStateToProps,
  { resetSuccess }
);

const FormsHoc = withThemeWrapper(withFormsData(Forms));

export default enhance(FormsHoc);
