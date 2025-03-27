import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword/index';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Politica from '../pages/Politica';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} isfullLayout />
    <Route path="/signUp" component={SignUp} isfullLayout />
    <Route path="/forgot-password" component={ForgotPassword} isfullLayout />
    <Route path="/reset-password" component={ResetPassword} isfullLayout />
    <Route path="/politica" component={Politica} isfullLayout />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
