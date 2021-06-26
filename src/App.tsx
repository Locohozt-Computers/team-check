import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SignInPage from "pages/Signin";
import SignUpPage from "pages/Signup";
import axios from "axios";
import HomePage from "pages/Home";
import SearchPage from "pages/SearchPage";
import PrivateRoute from "route/PrivateRoute";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import EmailVerificationPage from "pages/EmailVerificationPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import RegisteredPhonesPage from "pages/RegisteredPhonesPage";
import WalletPage from "pages/WalletPage";
import ProfilePage from "pages/ProfilePage";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <PrivateRoute isAuth={true} exact path="/home" component={HomePage} />
        <PrivateRoute
          isAuth={true}
          exact
          path="/phones"
          component={RegisteredPhonesPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/wallet"
          component={WalletPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/user"
          component={ProfilePage}
        />
        <Route exact path="/auth/signin" component={SignInPage} />
        <Route exact path="/auth/signup" component={SignUpPage} />
        <Route
          exact
          path="/auth/forgotpassword"
          component={ForgotPasswordPage}
        />
        <Route
          exact
          path="/auth/emailverification"
          component={EmailVerificationPage}
        />
        <Route exact path="/auth/reset" component={ResetPasswordPage} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
