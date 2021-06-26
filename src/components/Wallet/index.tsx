import React from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import Transactions from './Transactions'
import { Container } from "./style";
import WalletCard from "./WalletCard";
import CustomButton from "components/ui/CustomButton";
import CustomInput from "components/ui/CustomInput";

const WalletComponent = () => {
  return (
    <HomeLayout>
      <Container>
        <h1 className="hi">Wallet</h1>
        <WalletCard amount="5,000" label="Wallet Balance" />
        <div className="fund_btn">
          <CustomInput
            onChange={() => {}}
            placeholder="Search..."
            style={{ width: "100%", padding: "10px", flex: 4 }}
          />
          <CustomButton
            label="Transfer"
            background="violet"
            style={{ flex: 1, marginLeft: 30 }}
          />
          <CustomButton
            label="Fund Wallet"
            background="#177BFF"
            style={{ flex: 1, marginLeft: 30 }}
          />
        </div>
        <Transactions />
      </Container>
    </HomeLayout>
  );
};

export default WalletComponent;
