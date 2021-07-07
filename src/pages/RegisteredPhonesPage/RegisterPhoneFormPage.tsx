import React, { useState } from "react";

import RegisterPhoneForm from "components/RegisteredPhones/RegisterPhoneForm";

const RegisterPhoneFormPage = () => {
  const [values, setValues] = useState({
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
  return (
    <div>
      <RegisterPhoneForm values={values} setValues={setValues} />
    </div>
  );
};

export default RegisterPhoneFormPage;
