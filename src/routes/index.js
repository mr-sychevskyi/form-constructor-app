import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Forms, FormFills, FormFillPage, Constructor } from 'containers';
import { adminRole, guestRole, checkAccess } from 'containers/auth/auth';
import { getAuthRole } from 'reducers/auth';
import { PageNotFound } from 'components';

const Routes = ({ currRole }) => (
  <Switch>
    {checkAccess(currRole, adminRole) && <Route exact path="/" render={() => <Redirect to="/forms/list"/>}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms" render={() => <Redirect to="/forms/list"/>}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/list" component={Forms}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/new" component={Constructor}/>}
    {checkAccess(currRole, adminRole) && <Route exact path="/forms/:id" component={Constructor}/>}
    {checkAccess(currRole, guestRole) && <Route path="/forms/active/:id" component={FormFillPage}/>}
    {checkAccess(currRole, adminRole) && <Route path="/fills/:id" component={FormFills}/>}
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
