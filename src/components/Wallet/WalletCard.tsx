import React, { useContext, useEffect } from "react";
import { WalletContext } from "context/wallet/WalletProvider";
import { formatPrice } from "utils/formatPrice";
import { WalletCardStyle } from "./style";

type Props = {
  amount?: any;
  label: string;
  profile: any;
};

const WalletCard: React.FC<Props> = ({ amount, label, profile }) => {
  const { walletBalance } = useContext(WalletContext);

  console.log("walletBalance === ", walletBalance);

  return (
    <WalletCardStyle>
      <h1>{label}</h1>
      <h1>{formatPrice(amount)}</h1>
    </WalletCardStyle>
  );
};

export default WalletCard;
