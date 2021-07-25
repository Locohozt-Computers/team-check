import React, { useState } from "react";

import RegisterPhoneForm from "components/RegisteredPhones/RegisterPhoneForm";
import { useContext } from "react";
import { AuthContext } from "context/auth/AuthProvider";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { useEffect } from "react";
import { errorNotify, successNotify } from "utils/errorMessage";
import { canNotRegisterPhone } from "utils/canNotRegisterPhone";

export type RegisterValueType = {
  agent_id?: number | any;
  user_id?: number | any;
  images: string[];
  category_id: number;
  state_id: number;
  lga_id: number;
  brand_id: number;
  phone_model_id: number;
  condition_id: number;
  ram_size_id: number;
  internal_storage: string;
  screen_size_id: number;
  color_id: number;
  operating_system_id: number;
  display_type: string;
  resolution: string;
  sim: string;
  card_slot: string;
  main_camera: string;
  selfie_camera: string;
  battery: string;
  description: string;
  amount: string | any;
  warranty: number;
  pay_type: number;
  trxref: string;
  reference: string;
  // isNogetiable?: boolean;
};

const RegisterPhoneFormPage = () => {
  const { user } = useContext(AuthContext);
  const { getRegFee, registerPhone } = useContext(RegisterPhoneContext);
  const [showError, setShowError] = useState(false);
  const [values, setValues] = useState<RegisterValueType>({
    agent_id: user?.id,
    images: [],
    category_id: 0,
    state_id: 0,
    lga_id: 0,
    brand_id: 0,
    phone_model_id: 0,
    condition_id: 0,
    ram_size_id: 0,
    internal_storage: "",
    screen_size_id: 0,
    color_id: 0,
    operating_system_id: 0,
    display_type: "",
    resolution: "",
    sim: "",
    card_slot: "",
    main_camera: "",
    selfie_camera: "",
    battery: "",
    description: "",
    amount: "",
    warranty: 0,
    pay_type: 0,
    trxref: "",
    reference: "",
    // isNogetiable: false,
  });

  useEffect(() => {
    getRegFee();

    // eslint-disable-next-line
  }, []);

  const onSubmit = async (obj: { reference?: string; trxref?: string }) => {
    // e.preventDefault();

    const notValidVorm = canNotRegisterPhone(values);

    if (notValidVorm) {
      setShowError(true);
      return errorNotify("Some fields are required");
    }

    try {
      await registerPhone({
        ...values,
        reference: obj?.reference ?? "",
        trxref: obj?.trxref ?? "",
      });
      successNotify("Successfully register a phone");
      setShowError(false);
    } catch (error) {
      errorNotify("something went wrong");
    }
  };

  return (
    <div>
      <RegisterPhoneForm
        values={values}
        setValues={setValues}
        onSubmit={onSubmit}
        showError={showError}
        setShowError={setShowError}
      />
    </div>
  );
};

export default RegisterPhoneFormPage;
