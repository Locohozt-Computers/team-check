import React, { useContext, useState } from "react";

import SearchComponent from "components/SearchComponent";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { errorNotify } from "utils/errorMessage";

const SearchPage = () => {
  const { searchADevice, clearADevice, searchedPhones } =
    useContext(RegisterPhoneContext);

  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const searchPhone = async () => {
    try {
      setModal(true);
      setLoading(true);
      await searchADevice(value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setModal(false);
      errorNotify("Could not find phone");
    }
  };
  return (
    <SearchComponent
      value={value}
      loading={loading}
      modal={modal}
      setModal={setModal}
      searchPhone={searchPhone}
      searchedPhones={searchedPhones}
      clearADevice={clearADevice}
      handleChange={handleChange}
    />
  );
};

export default SearchPage;
