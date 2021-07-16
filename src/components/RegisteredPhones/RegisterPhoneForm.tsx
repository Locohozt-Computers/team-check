import React, { Dispatch, SetStateAction, useContext } from "react";
import { Row, Col, Form, Input, Checkbox } from "antd";
import Select from "react-select";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container, FormStyle } from "./style";
import CustomInput from "components/ui/CustomInput";
import CustomDropdown from "components/ui/CustomDropdown";
import { useHistory } from "react-router-dom";
import Title from "components/ui/Title";
import { registerData } from "./data";
import { RegisterValueType } from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";
import CustomButton from "components/ui/CustomButton";
import registerFormValidation from "utils/validations/registerFormValidation";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";

type Props = {
  values: RegisterValueType;
  errors: RegisterValueType;
  setValues: Dispatch<SetStateAction<any>>;
  setErrors: Dispatch<SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

const RegisterPhoneForm: React.FC<Props> = ({
  setValues,
  values,
  onSubmit,
  setErrors,
  errors: error,
}) => {
  const history = useHistory();
  const {
    brands,
    models,
    condition,
    screen_size,
    colors,
    states,
    destrict,
    getModels,
    getDestrict,
  } = useContext(RegisterPhoneContext);

  const inputOnChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <HomeLayout>
      <Container>
        <h1 className="register_title">
          <i
            className="fas fa-arrow-left"
            style={{ marginRight: 20, cursor: "pointer", color: "#c5c7e2" }}
            onClick={() => history.goBack()}
          ></i>{" "}
          <Title title="Register A Phone" />
        </h1>
        <br />
        <br />
        <FormStyle onSubmit={onSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Select
                className="select"
                options={states}
                isSearchable={true}
                name="state_id"
                placeholder="States"
                onChange={({ id }: any) => {
                  getDestrict(id);
                  setValues({
                    ...values,
                    state_id: id,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24}>
              <Select
                className="select"
                isDisabled={destrict?.length > 0 ? false : true}
                isSearchable={true}
                options={destrict}
                placeholder="Destrict"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    lga_id: id,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={brands}
                placeholder="Brands"
                onChange={({ id }: any) => {
                  getModels(parseInt(id));
                  setValues({
                    ...values,
                    brand_id: id,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                isDisabled={models?.length > 0 ? false : true}
                options={models}
                placeholder="Models"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    phone_model_id: id,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={condition}
                placeholder="Condition"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    condition_id: id,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={[]}
                placeholder="Second Condition"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    second_condition_id: id,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={[]}
                placeholder="Ram"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    ram: value,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={condition}
                placeholder="Internal Storage"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    internal_storage: value,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={screen_size}
                placeholder="Screen Size"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    screen_size_id: id,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={colors}
                isSearchable={true}
                placeholder="Colors"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    color_id: id,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={[]}
                placeholder="Operating System"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    operating_system_id: id,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={[]}
                placeholder="Display Type"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    display_type: value,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={[]}
                placeholder="Resolution"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    resolution: value,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={[]}
                placeholder="SIM"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    sim: value,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={[]}
                placeholder="Card Slot"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    card_slot: value,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={[]}
                placeholder="Main Camera"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    main_camera: value,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={[]}
                placeholder="Selfie Camera"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    selfie_camera: value,
                  });
                }}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <Select
                className="select"
                options={[]}
                placeholder="Battery (MAH)"
                onChange={({ value }: any) => {
                  setValues({
                    ...values,
                    battery: value,
                  });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Form.Item style={{ width: "100%" }}>
              <Input.TextArea
                placeholder="Description"
                rows={4}
                onChange={({ target: { value } }) =>
                  setValues({
                    ...values,
                    description: value,
                  })
                }
              />
            </Form.Item>
          </Row>
          <br />
          <Row>
            <CustomInput
              placeholder="Price"
              name="price"
              value={values.price}
              onChange={inputOnChange}
            />
          </Row>
          <br />
          <Row>
            <Checkbox
              onChange={({ target: { checked } }) =>
                setValues({
                  ...values,
                  isNogetiable: checked,
                })
              }
            >
              Negotiable
            </Checkbox>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomInput
                placeholder="Your Phone"
                name="your_price"
                value={values.your_price}
                onChange={inputOnChange}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomInput
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={inputOnChange}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <CustomButton
              type="submit"
              label="Submit"
              background="dodgerblue"
            />
          </Row>
        </FormStyle>
      </Container>
    </HomeLayout>
  );
};

export default RegisterPhoneForm;
