import React from "react";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
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
            label="Fund Your Wallet"
            background="violet"
            style={{ flex: 2, marginLeft: 30 }}
          />
        </div>
      </Container>
    </HomeLayout>
  );
};

export default WalletComponent;
