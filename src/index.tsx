import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./context/auth/AuthProvider";
import LayoutProvider from "context/layout/LayoutProvider";
import WalletProvider from "context/wallet/WalletProvider";
import RegisterPhoneProvider from "context/registerPhone/RegisterPhoneProvider";
import AdminProvider from "context/admin/AdminProvider";

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
