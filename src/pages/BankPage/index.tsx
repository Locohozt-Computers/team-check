import React, { useEffect, useState } from "react";
import BankForm from "components/Bank/BankForm/BankForm";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container } from "./style";
import BankDisplay from "components/Bank/BankDisplay/BankDisplay";
import { useWallet } from "context/wallet/WalletProvider";
import { BankType } from "types/walletTypes";
import { useAuth } from "context/auth/AuthProvider";

const BankPage = () => {
  const { profile, getProfile } = useAuth();
  const { addBank, displayBankDetails } = useWallet();

  const [name, setName] = useState("");

  const [values, setValues] = useState({
    bank_code: "",
    bank_name: "",
    account_number: "",
    account_name: name,
  });

  const [form, setForm] = useState({
    error: null,
    loading: false,
  });

  // "2388081978"
  // 1470698720

  const onSubmit = async (values: BankType) => {
    try {
      setForm({
        ...form,
        loading: true,
      });
      const response = await addBank(values);
      displayBankDetails(response);
      setForm({
        ...form,
        loading: false,
      });
      setValues({
        bank_code: "",
        bank_name: "",
        account_number: "",
        account_name: "",
      });
      setName("");
    } catch (error: any) {
      setForm({
        ...form,
        loading: false,
        error,
      });
    }
  };

  useEffect(() => {
    getProfile(profile?.id ?? "");

    // eslint-disable-next-line
  }, []);

  return (
    <HomeLayout>
      <Container>
        <BankForm
          onSubmit={onSubmit}
          form={form}
          name={name}
          values={values}
          setName={setName}
          setValues={setValues}
        />
        <BankDisplay profile={profile} />
      </Container>
    </HomeLayout>
  );
};

export default BankPage;
