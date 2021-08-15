import React, { useContext } from "react";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import PhoneList from "components/RegisteredPhones/PhoneList";

const PhoneAdvert = () => {
  const { phone_advert_lists } = useContext(RegisterPhoneContext);
  return (
    <div>
      {phone_advert_lists?.map((list: any) => (
        <PhoneList phone={list} gridNo="100px" hidePrice={true} />
      ))}
    </div>
  );
};

export default PhoneAdvert;
