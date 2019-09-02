import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constructorElementsTotal } from 'reducers/constructor';
import ConstructorElementsView from './views/constructor-elements-view';
import { FORM_ELEMENTS, FORM_ELEMENTS_LIMIT } from './constructor-elements-constants';

class ConstructorElements extends Component {
  render() {
    const { currFormElementsAdded, openElementConfig } = this.props;

    return (
      <ConstructorElementsView
        data={FORM_ELEMENTS}
        isElementsLimitReached={currFormElementsAdded >= FORM_ELEMENTS_LIMIT}
        openElementConfig={openElementConfig}
      />
    );
  }
}

const mapStateToProps = state => ({
  currFormElementsAdded: constructorElementsTotal(state),
});

const enhance = connect(
  mapStateToProps,
  null
);

export default enhance(ConstructorElements);
