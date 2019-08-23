import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getConstructorElementsTotal } from 'reducers/constructor';
import ConstructorElementsView from './views/constructor-elements-view';
import { FORM_ELEMENTS, FORM_ELEMENTS_LIMIT } from './constructor-elements-constants';

class ConstructorElements extends Component {
  render() {
    return (
      <ConstructorElementsView
        {...this.props}
        data={FORM_ELEMENTS}
        isElementsLimitReached={this.props.currFormElementsAdded >= FORM_ELEMENTS_LIMIT}
      />
    );
  }
}

const mapStateToProps = state => ({
  currFormElementsAdded: getConstructorElementsTotal(state),
});

const enhance = connect(
  mapStateToProps,
  null
);

export default enhance(ConstructorElements);
