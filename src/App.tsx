import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignInPage from "pages/Signin";
import SignUpPage from "pages/Signup";
import axios from "axios";
import HomePage from "pages/Home";
import SearchPage from "pages/SearchPage";
import PrivateRoute from "route/PrivateRoute";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import EmailVerificationPage from "pages/EmailVerificationPage";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <PrivateRoute isAuth={true} exact path="/home" component={HomePage} />
        <PrivateRoute isAuth={true} exact path="/phones" component={HomePage} />
        <PrivateRoute
          isAuth={true}
          exact
          path="/services"
          component={HomePage}
        />
        <PrivateRoute isAuth={true} exact path="/user" component={HomePage} />
        <Route exact path="/auth/signin" component={SignInPage} />
        <Route exact path="/auth/signup" component={SignUpPage} />
        <Route exact path="/auth/forgotpassword" component={ForgotPasswordPage} />
        <Route exact path="/auth/emailverification" component={EmailVerificationPage} />
      </Switch>
    </Router>
  );
}

export default App;
