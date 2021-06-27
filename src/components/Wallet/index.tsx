import React, { useState } from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import Transactions from "./Transactions";
import { Container } from "./style";
import WalletCard from "./WalletCard";
import CustomButton from "components/ui/CustomButton";
import CustomInput from "components/ui/CustomInput";
import FundWallet from "./FundWallet";
import { formatPrice } from "utils/formatPrice";

const WalletComponent = () => {
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);

  const payments: any = localStorage.getItem("techCheckPointAmount");
  const walletObj = JSON.parse(payments);

  const [amount, setAmount] = useState(walletObj?.amount ?? 0);

  return (
    <HomeLayout>
      <Container>
        <h1 className="hi">Wallet</h1>
        <WalletCard amount={formatPrice(amount)} label="Wallet Balance" />
        <div className="fund_btn">
          <CustomInput
            onChange={() => {}}
            placeholder="Search..."
            style={{ width: "100%", padding: "10px", flex: 4 }}
          />
          <CustomButton
            label="Transfer"
            background="violet"
            className="fund_transfer_btn"
          />
          <CustomButton
            label="Fund"
            background="#177BFF"
            onClick={() => setShowFundWalletModal(true)}
            className="fund_wallet_btn"
          />
        </div>
        <FundWallet
          setAmount={setAmount}
          setShowFundWalletModal={setShowFundWalletModal}
          showFundWalletModal={showFundWalletModal}
        />
        <Transactions />
      </Container>
    </HomeLayout>
  );
};

export default WalletComponent;
