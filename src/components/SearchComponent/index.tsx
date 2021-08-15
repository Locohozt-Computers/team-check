import React, { useContext, useState } from "react";
import AuthNavbar from "components/layouts/AuthNavbar";
import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Content, PhonesAdvertStyle } from "./style";
import { Col, Row } from "antd";
import PhoneAdvert from "components/PhoneAdvert";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { errorNotify } from "utils/errorMessage";
import CustomModalUI from "components/ui/CustomModal";
import { SelectCards, SelectActions, SelectCard } from "components/Wallet";
import PhoneDetailComponent from "components/Home/PhoneDetailComponent";
import Loader from "components/ui/Loader";

const SearchComponent = () => {
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
    <Container>
      <AuthNavbar />
      <Row>
        <Col xs={24} md={16}>
          <Content>
            <h2>
              <span className="blue">Tech</span>
              <span className="red">Check</span>
              <span className="yellow">Point</span>
            </h2>
            <InputWithLabel
              showIcon={true}
              noLabel={true}
              value={value}
              onChange={handleChange}
              placeholder="Search for a device..."
              style={{ maxWidth: 600, width: "100%", marginBottom: 20 }}
            />
            <CustomButton
              label="Search Device"
              onClick={searchPhone}
              style={{
                width: 200,
                border: "1px solid #dddddd",
                borderRadius: 10,
                overflow: "hidden",
              }}
            />
          </Content>
        </Col>
        <Col xs={24} md={8}>
          <PhonesAdvertStyle>
            <PhoneAdvert />
          </PhonesAdvertStyle>
        </Col>
      </Row>

      <CustomModalUI
        visible={modal}
        component={() => {
          return (
            <SelectCards>
              <h1>Phone Detail</h1>
              {loading ? (
                <Loader />
              ) : (
                <PhoneDetailComponent device_detail={searchedPhones} />
              )}
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setModal(false);
                    clearADevice();
                  }}
                >
                  <span>Close</span>
                </SelectCard>
              </SelectActions>
            </SelectCards>
          );
        }}
        handleCancel={() => setModal(false)}
        width={650}
        closable={false}
      />
    </Container>
  );
};

export default SearchComponent;
