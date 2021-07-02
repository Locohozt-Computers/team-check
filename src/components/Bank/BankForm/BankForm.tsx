import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ErrorLabel } from "components/Auth/common/style";
import { Container, Form } from "./style";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import CustomSelect from "components/ui/CustomSelect";
import { createHttp, getHttp } from "utils/api/createHttp";
import { authErrorHandler } from "utils/CatchErrors";
import CustomDropdown from "components/ui/CustomDropdown";

type Props = {
  onSubmit?: any;
  form: {
    loading: boolean;
    error: any;
  };
};

const BankForm: React.FC<Props> = ({ onSubmit, form }) => {
  const [banks, setBanks] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    bank_code: "",
    bank_name: "",
    account_number: "",
    account_name: name,
  });

  const getBanks = async () => {
    try {
      const res = await getHttp("/all-banks");
      const banks = res?.map((bank: any) => {
        return {
          id: bank?.BankSortCode,
          label: bank?.BankName,
          value: bank?.BankCode,
        };
      });
      setBanks(banks);
    } catch (error) {
      //   authErrorHandler(error);
    }
  };

  const onchangeBank = ({ target }: any) => {
    const value = target?.value?.split("**")[0];
    const label = target?.name;

    setValues({
      ...values,
      bank_code: value,
      bank_name: label,
    });
  };

  const getAccountName = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value.length);
    setValues({
      ...values,
      account_number: value,
    });
    setLoading(true);
    const res = await createHttp("/account-details", {
      account_number: value,
      bank_code: values.bank_code,
    });
    setName(res?.account_name);
    setLoading(false);
  };

  useEffect(() => {
    getBanks();
  }, []);

  const disable =
    (form.loading || values.account_number.length >= 10) && Boolean(name);

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            ...values,
            account_name: name,
          });
        }}
        data-testid="sign-in-form"
      >
        <h1>Add Bank Details</h1>
        <ErrorLabel textAlign="center"></ErrorLabel>
        <CustomDropdown
          data={banks}
          onChange={onchangeBank}
          defaultSelect="Select your bank"
          style={{ marginBottom: 30 }}
        />
        <InputWithLabel
          placeholder="Enter Account Name"
          label="Account Name"
          disabled={true}
          onChange={() => {}}
          value={name}
          style={{
            marginBottom: 30,
          }}
        />
        <InputWithLabel
          placeholder="Enter Account Number"
          label="Account Number"
          type="number"
          onChange={getAccountName}
          value={values.account_number}
          style={{
            marginBottom: 30,
          }}
        />
        <CustomButton
          testId="signin"
          label={"Add Bank"}
          type={"submit"}
          disabled={!disable}
          background={!disable ? "#f1f1f7" : "#177BFF"}
          loading={form.loading}
        />
      </Form>
    </Container>
  );
};

export default BankForm;
