import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getForms, formsDataSelector, formsLoadingSelector, formsLoadedSelector, formsErrorSelector
} from 'reducers/forms';
import { getFills } from 'reducers/fills';
import { Loader } from 'components';

const withFormsData = ViewComponent => {
  class LoadDataController extends Component {
    componentDidMount() {
      const { loaded, getForms, getFills } = this.props;

      if (!loaded) {
        getForms();
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

  const mapStateToProps = (state) => ({
    forms: formsDataSelector(state),
    loading: formsLoadingSelector(state),
    loaded: formsLoadedSelector(state),
    error: formsErrorSelector(state),
  });

  const enhance = connect(
    mapStateToProps,
    {
      getForms,
      getFills
    }
  );

  return enhance(LoadDataController);
};

export default withFormsData;
