import React, { useContext, useState } from "react";
import BankForm from "components/Bank/BankForm/BankForm";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container } from "./style";
import BankDisplay from "components/Bank/BankDisplay/BankDisplay";
import { WalletContext } from "context/wallet/WalletProvider";
import { BankType } from "types/walletTypes";

const BankPage = () => {
  const { addBank } = useContext(WalletContext);

  const [loading, setLoading] = useState("");
  const [form, setForm] = useState({
    error: null,
    loading: false,
  });

  const accounts = [1234567890, 1987654321, 5432167890];

  

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
  return (
    <HomeLayout>
      <Container>
        <BankForm onSubmit={onSubmit} form={form} />
        <BankDisplay />
      </Container>
    </HomeLayout>
  );
};

export default BankPage;
