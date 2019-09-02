import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { FormsHoc, FormFillsHoc, FormFillPageHoc, ConstructorHoc } from 'containers';
import { adminRole, guestRole, checkAccess } from 'containers/auth/auth';
import { getAuthRole } from 'reducers/auth';
import { PageNotFound } from 'components';

const Routes = ({ currRole }) => (
  <Switch>
    {checkAccess(currRole, adminRole) && <Route exact path="/" render={() => <Redirect to="/forms/list"/>}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms" render={() => <Redirect to="/forms/list"/>}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/list" component={FormsHoc}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/new" component={ConstructorHoc}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/:id" component={ConstructorHoc}/>}
    {checkAccess(currRole, guestRole) && <Route path="/forms/active/:id" component={FormFillPageHoc}/>}
    {checkAccess(currRole, adminRole) && <Route path="/fills/:id" component={FormFillsHoc}/>}
    <Route component={PageNotFound}/>
  </Switch>
);

const mapStateToProps = state => ({
  currRole: getAuthRole(state),
});

const enhance = connect(
  mapStateToProps,
  {}
);

export default enhance(Routes);
