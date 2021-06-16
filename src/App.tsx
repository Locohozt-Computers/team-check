import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SignInPage from 'pages/Signin';
import SignUpPage from 'pages/Signup';
import axios from 'axios';
import ForgotPassword from 'components/Auth/ForgotPassword';
import HomePage from 'pages/Home';
import SearchPage from 'pages/SearchPage';
import PrivateRoute from 'route/PrivateRoute';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SearchPage} />
        <PrivateRoute isAuth={true} exact path='/home' component={HomePage} />
        <PrivateRoute isAuth={true} exact path='/phones' component={HomePage} />
        <PrivateRoute isAuth={true} exact path='/services' component={HomePage} />
        <PrivateRoute isAuth={true} exact path='/user' component={HomePage} />
        <Route exact path='/auth/signin' component={SignInPage} />
        <Route exact path='/auth/signup' component={SignUpPage} />
        <Route exact path='/auth/resetpassword' component={ForgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
