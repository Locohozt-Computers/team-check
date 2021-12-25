import React, { Dispatch, SetStateAction } from "react";
import { Col } from "antd";

import AuthNavbar from "components/layouts/AuthNavbar";
// import CustomButton from "components/ui/CustomButton";
import InputWithLabel from "components/ui/InputWithLabel";
import { Container, Content, PhonesAdvertStyle, SearchStyle, SearchButton } from "./style";
import PhoneAdvert from "components/PhoneAdvert";
import CustomModalUI from "components/ui/CustomModal";
import { SelectCards, SelectActions, SelectCard } from "components/Wallet";
import PhoneDetailComponent from "components/Home/PhoneDetailComponent";
import Loader from "components/ui/Loader";
import LandingComponent from "./LandingComponent";

type Props = {
  clearADevice: any;
  searchedPhones: any;
  value: string;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPhone: () => Promise<void>;
};

const SearchComponent: React.FC<Props> = ({
  value,
  modal,
  setModal,
  loading,
  handleChange,
  searchPhone,
  searchedPhones,
  clearADevice,
}) => {
  return (
    <Container>
      <AuthNavbar />
      <LandingComponent>
        <SearchStyle>
          <Col xs={24} md={24}>
            <Content>
              <InputWithLabel
                showIcon={true}
                noLabel={true}
                value={value}
                onChange={handleChange}
                placeholder="Search for a device..."
                style={{ width: "100%", background: "white" }}
              />
              <SearchButton onClick={searchPhone}>
                <i className="fas fa-search"></i>
              </SearchButton>
            </Content>
          </Col>
        </SearchStyle>
      </LandingComponent>
      <Col xs={24} md={24}>
        <PhonesAdvertStyle>
          <PhoneAdvert />
        </PhonesAdvertStyle>
      </Col>

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
