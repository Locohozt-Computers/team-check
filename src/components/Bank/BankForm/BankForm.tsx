import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ErrorLabel } from "components/Auth/common/style";
import { Container, Form } from "./style";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { createHttp, getHttp } from "utils/api/createHttp";
import CustomDropdown from "components/ui/CustomDropdown";

type Props = {
  onSubmit?: any;
  setValues: Dispatch<SetStateAction<any>>;
  values: any;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  form: {
    loading: boolean;
    error: any;
  };
};

const BankForm: React.FC<Props> = ({
  onSubmit,
  form,
  values,
  setValues,
  name,
  setName,
}) => {
  const [banks, setBanks] = useState([]);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBanks = async () => {
    try {
      const res = await getHttp("/all-banks");
      const banks = res?.map((bank: any) => {
        return {
          id: bank?.BankSortCode,
          label: bank?.bankName,
          value: bank?.bankCode,
        };
      });
      setBanks(banks);
    } catch (error) {
      //   authErrorHandler(error);
    }
  };

  const onchangeBank = ({ target }: any) => {
    const value = target?.value?.split("**")[0];
    const label = target?.label;

    setValues({
      ...values,
      bank_code: value,
      bank_name: label,
    });
  };

  const getAccountName = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      account_number: value,
    });
    setLoading(true);
    try {
      const res = await createHttp("/account-details", {
        account_number: value,
        bank_code: values.bank_code,
      });
      setName(res?.account_name);
      setLoading(false);
    } catch (error: any) {
      if (name && error) {
        setName("");
      }
      setError(
        // error?.response?.data?.errors?.account_number[0]
        //   ? error?.response?.data?.errors?.account_number[0]
        //   : error?.response?.data?.message
        "Something went wrong, try again"
      );
    }
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
          placeholder="Enter Account Number"
          label="Account Number"
          type="number"
          onChange={getAccountName}
          value={values.account_number}
          style={{
            marginBottom: error ? 5 : 30,
          }}
        />
        <span
          style={{
            marginBottom: 30,
            color: "orangered",
            fontSize: 12,
          }}
        >
          {error && error}
        </span>
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
