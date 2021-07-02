import React, { useContext, useEffect, useState } from "react";
import BankForm from "components/Bank/BankForm/BankForm";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container } from "./style";
import BankDisplay from "components/Bank/BankDisplay/BankDisplay";
import { WalletContext } from "context/wallet/WalletProvider";
import { BankType } from "types/walletTypes";
import { AuthContext } from "context/auth/AuthProvider";

const BankPage = () => {
  const { profile, getProfile } = useContext(AuthContext);
  const { addBank } = useContext(WalletContext);

  const [form, setForm] = useState({
    error: null,
    loading: false,
  });

  const onSubmit = async (values: BankType) => {
    try {
      setForm({
        ...form,
        loading: true,
      });
      await addBank(values);
      setForm({
        ...form,
        loading: false,
      });
    } catch (error) {
      setForm({
        ...form,
        loading: false,
        error,
      });
    }
  };

  useEffect(() => {
    getProfile(profile?.id ?? "");
  }, []);

  return (
    <HomeLayout>
      <Container>
        <BankForm onSubmit={onSubmit} form={form} />
        <BankDisplay profile={profile} />
      </Container>
    </HomeLayout>
  );
};

export default BankPage;
