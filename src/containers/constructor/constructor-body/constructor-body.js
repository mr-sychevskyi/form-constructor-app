import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getOptionName } from 'utils';
import { addForm, updateForm } from 'reducers/forms';
import { removeFromConstructor, updateConstructorOrder, } from 'reducers/constructor';
import ConstructorBodyView from './views/constructor-body-view';
import { TYPE_ATTR_OPTIONS as typeAttrOptions } from '../constructor-el-config/constructor-el-config-constants';

class ConstructorBody extends Component {
  state = {
    formName: '',
    isFormCreated: false,
  };

  componentDidMount() {
    const { currForm } = this.props;

    if (currForm) {
      this.setState({
        formName: currForm.name,
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleIsFormCreated = () => {
    this.setState({
      isFormCreated: true,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { constructorBody, formId, addForm, updateForm, } = this.props;
    const { formName } = this.state;

    const constructorBodyData = constructorBody.map(element =>
      (element.type
        ? {
          ...element,
          type: element.type.length > 1 ? element.type : getOptionName(typeAttrOptions, element.type)
        }
        : element)
    );

    const action = formId ? updateForm : addForm;
    const formData = {
      name: formName,
      fields: constructorBodyData,
    };

    action(formData, formId);
    this.handleIsFormCreated();
  };

  render() {
    const { constructorBody } = this.props;
    const { formName, isFormCreated } = this.state;

    return (
      <>
        {isFormCreated && <Redirect to="/forms/list"/>}

        {!constructorBody.length
          ? (
            <div className="d-table">
              <h2 className="d-table-cell info-default">No elements yet :(</h2>
            </div>
          )
          : (
            <ConstructorBodyView
              {...this.props}
              formName={formName}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
      </>
    );
  }
}

const enhance = connect(
  null,
  {
    addForm,
    updateForm,
    updateConstructorOrder,
    removeFromConstructor,
  }
);

export default enhance(ConstructorBody);
