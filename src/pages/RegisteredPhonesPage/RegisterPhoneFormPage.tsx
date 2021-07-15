import React, { useState } from "react";

import RegisterPhoneForm from "components/RegisteredPhones/RegisterPhoneForm";
import registerFormValidation from "utils/validations/registerFormValidation";

export type RegisterValueType = {
  brand: string;
  model: string;
  condition: string;
  second_condition: string;
  ram: string;
  internal_storage: string;
  screen_size: string;
  color: string;
  operating_system: string;
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
    brand: "",
    model: "",
    condition: "",
    second_condition: "",
    ram: "",
    internal_storage: "",
    screen_size: "",
    color: "",
    operating_system: "",
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
  //   condition: "",
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
