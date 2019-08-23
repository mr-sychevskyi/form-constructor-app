import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getConstructorElementsNames } from 'reducers/constructor';
import ConstructorElConfigView from './views/constructor-el-config-view';

class ConstructorElConfig extends Component {
  state = {
    data: {},
    newOption: '',
    isNameExists: false,
    isSelectEmpty: false,
  };

  componentDidMount() {
    const { currEl } = this.props;

    Object.keys(currEl).forEach(field => this.handleChangeDataState(field, currEl[field]));
  }

  // isNoChanged = () => {
  //   const { id, ...other } = this.props.currEl;
  //   const { data } = this.state;
  //
  //   return JSON.stringify(other) === JSON.stringify(data);
  // };

  addOption = () => {
    const { data: { options }, newOption } = this.state;
    const value = options.length
      ? options.sort((a, b) => a > b)[0].value + 1
      : 0;
    const newOptionObj = {
      name: newOption,
      value,
    };

    this.handleChangeDataState('options', [newOptionObj, ...options]);
    this.setState({
      newOption: '',
      isSelectEmpty: false
    });
  };

  removeOption = e => {
    const { options } = this.state.data;
    const { id } = e.currentTarget;
    const newOptions = options.filter(option => option.value !== +id);

    this.handleChangeDataState('options', newOptions);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeDataState = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  handleChangeData = e => {
    this.handleChangeDataState(e.target.name, e.target.value);
  };

  handleToggleData = e => {
    const { name } = e.target;
    const { data } = this.state;

    this.handleChangeDataState(name, !data[name]);
  };

  handleSubmit = e => {
    e.preventDefault();

    const { currEl: { id }, currFormElNames, addElToConstructor, handleElementConfigOpen } = this.props;
    const { data } = this.state;
    const { name } = data;

    if (Object.values(currFormElNames).indexOf(name) !== -1 && currFormElNames[id] !== name) {
      this.setState({
        isNameExists: true
      });

      return;
    }

    if (data.options && !data.options.length) {
      this.setState({
        isSelectEmpty: true
      });

      return;
    }

    addElToConstructor(data);
    handleElementConfigOpen();
  };

  render() {
    const { handleElementConfigOpen } = this.props;

    return (
      <ConstructorElConfigView
        {...this.state}
        handleElementConfigOpen={handleElementConfigOpen}
        addOption={this.addOption}
        removeOption={this.removeOption}
        handleChange={this.handleChange}
        handleChangeData={this.handleChangeData}
        handleToggleData={this.handleToggleData}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currFormElNames: getConstructorElementsNames(state),
});

const enhance = connect(
  mapStateToProps,
  {}
);

export default enhance(ConstructorElConfig);
