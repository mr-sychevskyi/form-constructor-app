import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getFills, formFillsSelector, fillsLoadingSelector, fillsLoadedSelector, fillsErrorSelector,
} from 'reducers/fills';
import { Loader } from 'components';

const withFormFillsData = ViewComponent => {
  class LoadDataController extends Component {
    componentDidMount() {
      const { loaded, getFills } = this.props;

      if (!loaded) {
        getFills();
      }
    }

    render() {
      const { loading, loaded, error } = this.props;

      if (error) {
        return <h3 className="info-error">{error.message}</h3>;
      }

      if (loading) {
        return <Loader/>;
      }

      return loaded && <ViewComponent {...this.props}/>;
    }
  }

  const mapStateToProps = (state, props) => ({
    fills: formFillsSelector(state, props),
    loading: fillsLoadingSelector(state),
    loaded: fillsLoadedSelector(state),
    error: fillsErrorSelector(state),
  });

  const enhance = connect(
    mapStateToProps,
    { getFills }
  );

  return enhance(LoadDataController);
};

export default withFormFillsData;
