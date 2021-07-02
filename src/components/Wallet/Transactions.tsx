import { WalletContext } from "context/wallet/WalletProvider";
import _ from "lodash";
import React, { useContext } from "react";
import { WalletType } from "types/walletTypes";
import { TransactionStyle } from "./style";
import TransactionList from "./TransactionList";

const Transactions: React.FC = () => {
  const { transactions } = useContext(WalletContext);

  const sortedTransactions = _.orderBy(transactions, "created_at", "desc");

  return (
    <TransactionStyle>
      <h1>Transactions</h1>
      {transactions?.length <= 0 ? (
        <p className="no_transaction">No transactions yet</p>
      ) : (
        sortedTransactions?.map((list: Partial<WalletType>) => (
          <TransactionList {...list} />
        ))
      )}
    </TransactionStyle>
  );
};

export default Transactions;
