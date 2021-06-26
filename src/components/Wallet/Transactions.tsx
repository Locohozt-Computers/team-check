import React from "react";
import { TransactionStyle } from "./style";
import TransactionList from "./TransactionList";

const Transactions: React.FC = () => {
  return (
    <TransactionStyle>
      <h1>Transactions</h1>
      {[1, 2, 3, 4, 5].map((list: any) => (
        <TransactionList />
      ))}
    </TransactionStyle>
  );
};

export default Transactions;
