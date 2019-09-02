import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';

import { uniqueId } from 'utils';
import { makeGetCurrForm } from 'reducers/forms';
import {
  addToConstructor, resetConstructorData, updateConstructor, constructorElements,
} from 'reducers/constructor';
import withThemeWrapper from 'hocs/with-theme-wrapper/with-theme-wrapper';

import ConstructorBody from './constructor-body/constructor-body';
import ConstructorElements from './constructor-elements/constructor-elements';
import ConstructorElConfig from './constructor-el-config/constructor-el-config';

import './constructor.scss';

class Constructor extends Component {
  state = {
    formId: null,
    currEl: {},
    isElementConfigOpen: false,
  };

  componentDidMount() {
    const { currForm, addToConstructor, resetConstructorData } = this.props;

    resetConstructorData();

    if (currForm) {
      const { fields } = currForm;

      this.setState({
        formId: currForm._id.$oid,
      });

      fields.forEach(el => addToConstructor(el));
    }
  }

  handleElementConfigOpen = () => (
    this.setState(prevState => ({
      isElementConfigOpen: !prevState.isElementConfigOpen
    }))
  );

  openElementConfig = el => {
    this.setState({
      currEl: el,
      isElementConfigOpen: true,
    });
  };

  addElToConstructor = el => {
    const { addToConstructor, updateConstructor } = this.props;
    const { id } = this.state.currEl;

    const action = id ? updateConstructor : addToConstructor;
    const formElData = {
      id: id || uniqueId(),
      ...el
    };

    action(formElData);
  };

  render() {
    const { currEl, isElementConfigOpen } = this.state;

    return (
      <>
        <div className="form-constructor">
          <aside className="form-constructor-elements">
            <ConstructorElements openElementConfig={this.openElementConfig}/>
          </aside>
          <main className="form-constructor-body">
            <ConstructorBody
              {...this.props}
              {...this.state}
              openElementConfig={this.openElementConfig}
            />
          </main>
        </div>
        <div className="app-navigation">
          <Link className="btn btn-go-back" to="/">
            <i className="btn__icon material-icons">keyboard_backspace</i>
            <span className="btn__text">Go back</span>
          </Link>
        </div>
        <Modal
          aria-labelledby="el-config-modal"
          aria-describedby="el-config-modal"
          open={isElementConfigOpen}
          onClose={this.handleElementConfigOpen}
        >
          <ConstructorElConfig
            currEl={currEl}
            addElToConstructor={this.addElToConstructor}
            handleElementConfigOpen={this.handleElementConfigOpen}
          />
        </Modal>
      </>
    );
  }
}

const makeMapStateToProps = () => {
  const getCurrForm = makeGetCurrForm();

  return (state, props) => ({
    constructorBody: constructorElements(state),
    currForm: getCurrForm(state, props),
  });
};

const enhance = connect(
  makeMapStateToProps,
  {
    addToConstructor,
    updateConstructor,
    resetConstructorData,
  }
);

const ConstructorHoc = withThemeWrapper(Constructor);

export default enhance(ConstructorHoc);
