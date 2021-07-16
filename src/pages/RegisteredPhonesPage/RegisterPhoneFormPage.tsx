import React, { useState } from "react";

import RegisterPhoneForm from "components/RegisteredPhones/RegisterPhoneForm";
import registerFormValidation from "utils/validations/registerFormValidation";

export type RegisterValueType = {
  state_id: number;
  lga_id: number;
  brand_id: number;
  phone_model_id: number;
  condition_id: number;
  second_condition: string;
  ram: string;
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
  price: string;
  name: string;
  your_price: string;
  isNogetiable?: boolean;
};

const RegisterPhoneFormPage = () => {
  const [values, setValues] = useState<RegisterValueType>({
    state_id: 0,
    lga_id: 0,
    brand_id: 0,
    phone_model_id: 0,
    condition_id: 0,
    second_condition: "",
    ram: "",
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
    price: "",
    name: "",
    your_price: "",
    isNogetiable: false,
  });

  // const [errors, setErrors] = useState<RegisterValueType>({
  //   brand: "",
  //   model: "",
  //   condition_id: "",
  //   second_condition: "",
  //   ram: "",
  //   internal_storage: "",
  //   screen_size: "",
  //   color: "",
  //   operating_system: "",
  //   display_type: "",
  //   resolution: "",
  //   sim: "",
  //   card_slot: "",
  //   main_camera: "",
  //   selfie_camera: "",
  //   battery: "",
  //   description: "",
  //   price: "",
  //   name: "",
  //   your_price: "",
  // });
  const [errors, setErrors] = useState<Partial<RegisterValueType> | any>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = registerFormValidation(values);

    console.log(values)

    setErrors(errors);
  };

  return (
    <div>
      <RegisterPhoneForm
        values={values}
        setValues={setValues}
        onSubmit={onSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
};

export default RegisterPhoneFormPage;
