import React from "react";
import { formatPrice } from "utils/formatPrice";
import { WalletCardStyle } from "./style";

type Props = {
  amount: number;
  label: string;
  profile: any;
};

const WalletCard: React.FC<Props> = ({ amount, label, profile }) => {

  return (
    <WalletCardStyle>
      <h1>{label}</h1>
      <h1>{formatPrice(profile?.walletBalance + amount)}</h1>
    </WalletCardStyle>
  );
};

export default WalletCard;
