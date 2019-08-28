import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { uniqueId } from 'utils';
import { makeGetCurrForm } from 'reducers/forms';
import {
  addToConstructor, resetConstructorData, updateConstructor, constructorElements,
} from 'reducers/constructor';
import { Header, ModalWrapper } from 'components';

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
    const { currForm } = this.props;

    this.props.resetConstructorData();

    if (currForm) {
      const { id, fields } = currForm;

      this.setState({
        formId: id,
      });

      fields.forEach(el => this.props.addToConstructor(el));
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
    // const {  } = this.props;
    const { id } = this.state.currEl;
    const action = id ? this.props.updateConstructor : this.props.addToConstructor;
    const formElData = {
      id: id || uniqueId(),
      ...el
    };

    action(formElData);
  };

  render() {
    const { isElementConfigOpen } = this.state;

    return (
      <>
        <Header/>
        <main className="main">
          <div className="container">
            <div className="form-constructor">
              <aside className="form-constructor-elements">
                <ConstructorElements openElementConfig={this.openElementConfig}/>
              </aside>
              <main className="form-constructor-body">
                <ConstructorBody
                  {...this.props}
                  {...this.state}
                  currEl={this.state.currEl}
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
          </div>
        </main>
        <ModalWrapper isOpen={isElementConfigOpen}>
          <ConstructorElConfig
            currEl={this.state.currEl}
            addElToConstructor={this.addElToConstructor}
            handleElementConfigOpen={this.handleElementConfigOpen}
          />
        </ModalWrapper>
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

export default enhance(Constructor);
