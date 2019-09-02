import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constructorElementsNames } from 'reducers/constructor';
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

    Object.keys(currEl).forEach(field => this.setFormState(field, currEl[field]));
  }

  addOption = () => {
    const { data: { options }, newOption } = this.state;
    const value = options.length
      ? options[options.length - 1].value + 1
      : 0;

    const newOptionObj = {
      name: newOption,
      value,
    };

    this.setFormState('options', [...options, newOptionObj]);
    this.setState({
      newOption: '',
      isSelectEmpty: false
    });
  };

  removeOption = e => {
    const { options } = this.state.data;
    const { id } = e.currentTarget;

    const newOptions = options.filter(option => option.value !== +id);

    this.setFormState('options', newOptions);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setFormState = (name, value) => {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  handleChangeData = e => {
    this.setFormState(e.target.name, e.target.value);
  };

  handleToggleData = e => {
    const { name } = e.target;
    const { data } = this.state;

    this.setFormState(name, !data[name]);
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
    const { currEl, handleElementConfigOpen } = this.props;

    return (
      <ConstructorElConfigView
        {...this.state}
        currEl={currEl}
        addOption={this.addOption}
        removeOption={this.removeOption}
        handleElementConfigOpen={handleElementConfigOpen}
        handleChange={this.handleChange}
        handleChangeData={this.handleChangeData}
        handleToggleData={this.handleToggleData}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currFormElNames: constructorElementsNames(state),
});

const enhance = connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
);

export default enhance(ConstructorElConfig);
