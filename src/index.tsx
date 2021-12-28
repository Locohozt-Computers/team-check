import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth/AuthProvider";
import LayoutProvider from "context/layout/LayoutProvider";
import WalletProvider from "context/wallet/WalletProvider";
import RegisterPhoneProvider from "context/registerPhone/RegisterPhoneProvider";
import AdminProvider from "context/admin/AdminProvider";
import { store } from "redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store
    }>
    <AuthProvider>
      <AdminProvider>
        <WalletProvider>
          <LayoutProvider>
            <RegisterPhoneProvider>
              <App />
            </RegisterPhoneProvider>
          </LayoutProvider>
        </WalletProvider>
      </AdminProvider>
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
