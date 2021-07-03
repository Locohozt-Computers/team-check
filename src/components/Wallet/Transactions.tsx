import CustomButton from "components/ui/CustomButton";
import { WalletContext } from "context/wallet/WalletProvider";
import _ from "lodash";
import React, { useContext } from "react";
import { WalletType } from "types/walletTypes";
import { TransactionStyle } from "./style";
import TransactionList from "./TransactionList";

const Transactions: React.FC = () => {
  const { transactions, nextUrl, loadMoreTransaction } =
    useContext(WalletContext);

  const sortedTransactions = _.orderBy(transactions, "created_at", "desc");

  const handleLoadMore = async () => {
    await loadMoreTransaction(nextUrl);
  };

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
      {nextUrl && <div className="load_more_center">
        <CustomButton
          label="Load More..."
          background="violet"
          width="150px"
          style={{ padding: "5px" }}
          onClick={handleLoadMore}
        />
      </div>}
    </TransactionStyle>
  );
};

export default Transactions;
