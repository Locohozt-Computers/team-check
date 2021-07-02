import React, { useContext, useState } from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import Transactions from "./Transactions";
import { Container } from "./style";
import WalletCard from "./WalletCard";
import CustomButton from "components/ui/CustomButton";
import CustomInput from "components/ui/CustomInput";
import FundWallet from "./FundWallet";
import { formatPrice } from "utils/formatPrice";
import { AuthContext } from "context/auth/AuthProvider";
import { GetEdBankType, UserType } from "types/authTypes";
import TransferToBank from "./TransferToBank";

const WalletComponent: React.FC<{
  profile: (UserType & { bank: GetEdBankType }) | null;
}> = ({ profile }) => {
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showTransferToBank, setShowTransferToBank] = useState(false);

  const [amount, setAmount] = useState(profile?.walletBalance ?? 0);

  console.log("profile === ", profile);

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
            onClick={() => setShowTransferToBank(true)}
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
          amount={amount}
          setShowFundWalletModal={setShowFundWalletModal}
          showFundWalletModal={showFundWalletModal}
        />
        <TransferToBank
          setAmount={setAmount}
          amount={amount}
          setShowTransferToBank={setShowTransferToBank}
          showTransferToBank={showTransferToBank}
        />
        <Transactions />
      </Container>
    </HomeLayout>
  );
};

export default WalletComponent;
