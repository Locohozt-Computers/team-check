import React, { useContext, useEffect, useState } from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import Transactions from "./Transactions";
import { Container } from "./style";
import WalletCard from "./WalletCard";
import CustomButton from "components/ui/CustomButton";
import CustomInput from "components/ui/CustomInput";
import FundWallet from "./FundWallet";
import { GetEdBankType, UserType } from "types/authTypes";
import TransferToBank from "./TransferToBank";
import CustomModalUI from "components/ui/CustomModal";
import styled from "styled-components";
import TransferToWallet from "./TransferToWallet";
import { WalletContext } from "context/wallet/WalletProvider";

const WalletComponent: React.FC<{
  profile: (UserType & { bank: GetEdBankType }) | null;
}> = ({ profile }) => {
  const { walletBalance } = useContext(WalletContext);

  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showTransferToBank, setShowTransferToBank] = useState(false);
  const [showTransferToWallet, setShowTransferToWallet] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [amw, setAmw] = useState(0);
  const [amb, setAmb] = useState(0);

  const [amount, setAmount] = useState(profile?.walletBalance ?? 0);

  return (
    <HomeLayout>
      <Container>
        <h1 className="hi">Wallet</h1>
        <WalletCard
          amount={walletBalance}
          label="Wallet Balance"
          profile={profile}
        />
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
          setAmount={setAmb}
          amount={amb}
          setShowTransferToBank={setShowTransferToBank}
          showTransferToBank={showTransferToBank}
        />
        <TransferToWallet
          setAmount={setAmw}
          amount={amw}
          showTransferToWallet={showTransferToWallet}
          setShowTransferToWallet={setShowTransferToWallet}
        />
        <Transactions />

        <CustomModalUI
          visible={showModal}
          component={() => {
            return (
              <SelectCards>
                <h1>Select Transfer Option</h1>
                <p>Please select your mode of transfer</p>
                <SelectActions>
                  <SelectCard
                    onClick={() => {
                      setShowTransferToBank(true);
                      setShowModal(false);
                    }}
                  >
                    <i className="fas fa-university"></i>
                    <span>Bank</span>
                  </SelectCard>
                  <SelectCard
                    onClick={() => {
                      setShowTransferToWallet(true);
                      setShowModal(false);
                    }}
                  >
                    <i className="fas fa-wallet"></i>
                    <span>Wallet</span>
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
    text-align: center;
    margin-bottom: 5px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
  }

  p {
    text-align: center;
    color: #555555;
    margin-bottom: 40px;
  }
`;

const SelectActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SelectCard = styled.div`
  width: 100px;
  height: 50px;
  border: 1px solid #eeeeee;
  text-align: center;
  line-height: 50px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  i {
    font-size: 16px;
  }

  span {
    margin-left: 10px;
  }
`;

export default WalletComponent;
