import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addForm, updateForm } from 'reducers/forms';
import { removeFromConstructor, updateConstructorOrder, } from 'reducers/constructor';
import ConstructorBodyView from './views/constructor-body-view';

class ConstructorBody extends Component {
  state = {
    formName: '',
    columnsCount: 1,
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

  render() {
    const { constructorBody } = this.props;
    const { formName, columnsCount, isFormCreated } = this.state;

    return (
      <>
        {isFormCreated && <Redirect to="/forms/list"/>}

        <div className="constructor-body">
          {!constructorBody.length
            ? <h2 className="no-items">No elements yet :(</h2>
            : (
              <ConstructorBodyView
                {...this.props}
                formName={formName}
                columnsCount={columnsCount}
                handleChange={this.handleChange}
                handleIsFormCreated={this.handleIsFormCreated}
              />
            )}
        </div>
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
