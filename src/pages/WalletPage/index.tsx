import React, { useContext } from "react";

import WalletComponent from "components/Wallet";
import { AuthContext } from "context/auth/AuthProvider";

const WalletPage = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div>
      <WalletComponent profile={profile} />
    </div>
  );
};

export default WalletPage;
