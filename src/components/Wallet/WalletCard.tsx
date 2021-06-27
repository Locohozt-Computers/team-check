import React from "react";
import { WalletCardStyle } from "./style";

type Props = {
  amount: string;
  label: string;
};

const WalletCard: React.FC<Props> = ({ amount, label }) => {
  return (
    <WalletCardStyle>
      <h1>{label}</h1>
      <h1>{amount}</h1>
    </WalletCardStyle>
  );
};

export default WalletCard;
