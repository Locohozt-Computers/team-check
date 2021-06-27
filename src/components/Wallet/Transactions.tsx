import { WalletContext } from "context/wallet/WalletProvider";
import React, { useContext } from "react";
import { TransactionStyle } from "./style";
import TransactionList from "./TransactionList";

const Transactions: React.FC = () => {
  const { transactions } = useContext(WalletContext);

  console.log(transactions);

  return (
    <TransactionStyle>
      <h1>Transactions</h1>
      {transactions?.length <= 0 ? (
        <p className='no_transaction'>No transactions yet</p>
      ) : (
        transactions?.map((list: any) => <TransactionList />)
      )}
    </TransactionStyle>
  );
};

export default Transactions;
