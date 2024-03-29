import React from "react";
import { WalletType } from "types/walletTypes";
import { formatPrice } from "utils/formatPrice";
import { TransactionListStyle } from "./style";

export const formatDate = (date: any) => new Date(date).toDateString();

const TransactionList: React.FC<Partial<WalletType>> = ({
  trans_type,
  amount,
  description,
  status,
  created_at,
}) => {
  const transType = trans_type?.name.toLowerCase() === "c" ? true : false;
  return (
    <TransactionListStyle status={transType}>
      <div className="transaction_type">{trans_type?.name.toUpperCase()}</div>
      <div className="transaction_amount">{formatPrice(amount)}</div>
      <div className="transaction_description">{description}</div>
      <div className="transaction_date">{formatDate(created_at)}</div>
    </TransactionListStyle>
  );
};

export default TransactionList;
