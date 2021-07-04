import React from "react";
import { formatPrice } from "utils/formatPrice";
import { WalletCardStyle } from "./style";

type Props = {
  amount?: any;
  label: string;
  profile?: any;
};

const WalletCard: React.FC<Props> = ({ amount, label }) => {
  return (
    <WalletCardStyle>
      <h1>{label}</h1>
      <h1>{formatPrice(amount)}</h1>
    </WalletCardStyle>
  );
};

export default WalletCard;
