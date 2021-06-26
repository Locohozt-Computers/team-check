import React from "react";
import { TransactionListStyle } from "./style";

const TransactionList = () => {
  return (
    <TransactionListStyle>
      <div className="transaction_type">C</div>
      <div className="transaction_amount">N 1,000</div>
      <div className="transaction_description">Fund wallet</div>
      <div className="transaction_date">May 20</div>
    </TransactionListStyle>
  );
};

export default TransactionList;
