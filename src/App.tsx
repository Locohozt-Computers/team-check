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
import BankPage from "pages/BankPage";
import NotFound from "components/NotFound";
import RegisterPhoneFormPage from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import PhoneDetail from "components/RegisteredPhones/PhoneDetail";
import SubscriptionPlan from "components/RegisteredPhones/SubscriptionPlan";
import AdminPage from "pages/AdminPage";
import SetupCommissionPage from "pages/AdminPage/SetupCommissionPage";
import SetupWarrantyPeriodPage from "pages/AdminPage/SetupWarrantyPeriodPage";
import AllUsersPage from "pages/AdminPage/AllUsersPage";
import AllAgentsPage from "pages/AdminPage/AllAgentsPage";

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
          path="/phones/registerphoneform"
          component={RegisterPhoneFormPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/phones/phone-detail/:deviceId"
          component={PhoneDetail}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/subscription-plans"
          component={SubscriptionPlan}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/wallet"
          component={WalletPage}
        />
        <PrivateRoute isAuth={true} exact path="/bank" component={BankPage} />
        <PrivateRoute
          isAuth={true}
          exact
          path="/user"
          component={ProfilePage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/setup"
          component={AdminPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/setup/commission"
          component={SetupCommissionPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/setup/warrantyperiod"
          component={SetupWarrantyPeriodPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/all-users"
          component={AllUsersPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/all-agents"
          component={AllAgentsPage}
        />
        <PrivateRoute
          isAuth={true}
          exact
          path="/admin/all-users"
          component={AllUsersPage}
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
        <Route>
          <NotFound status={404} />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
