import React, { useState } from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import Transactions from "./Transactions";
import { Container } from "./style";
import WalletCard from "./WalletCard";
import CustomButton from "components/ui/CustomButton";
import CustomInput from "components/ui/CustomInput";
import FundWallet from "./FundWallet";
import { formatPrice } from "utils/formatPrice";
import { GetEdBankType, UserType } from "types/authTypes";
import TransferToBank from "./TransferToBank";
import CustomModalUI from "components/ui/CustomModal";
import styled from "styled-components";

const WalletComponent: React.FC<{
  profile: (UserType & { bank: GetEdBankType }) | null;
}> = ({ profile }) => {
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showTransferToBank, setShowTransferToBank] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
            onClick={() => setShowModal(true)}
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

        <CustomModalUI
          visible={showModal}
          component={() => {
            return (
              <SelectCards>
                <h1>Select Transfer Option</h1>
                <SelectActions>
                  <SelectCard onClick={() => {}}>Wallet</SelectCard>
                  <SelectCard
                    onClick={() => {
                      setShowTransferToBank(true);
                      setShowModal(false);
                    }}
                  >
                    Bank
                  </SelectCard>
                </SelectActions>
              </SelectCards>
            );
          }}
          handleCancel={() => setShowModal(false)}
          width={350}
          closable={false}
        />
      </Container>
    </HomeLayout>
  );
};

const SelectCards = styled.div`
  background-color: white;
  padding: 20px;

  h1 {
    font-size: 25px;
  }
`;

const SelectActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SelectCard = styled.div`
  padding: 30px 0;
  width: 100px;
  border: 1px solid #dddddd;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
`;

export default WalletComponent;
