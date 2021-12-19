import React from "react";

import WalletComponent from "components/Wallet";
import { useAuth } from "context/auth/AuthProvider";

const WalletPage = () => {
  const { profile } = useAuth();

  return (
    <div>
      <WalletComponent profile={profile} />
    </div>
  );
};

export default WalletPage;
