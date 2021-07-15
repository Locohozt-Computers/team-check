import React, { Dispatch, SetStateAction, useContext } from "react";
import { Row, Col, Form, Input, Checkbox } from "antd";

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

  const selectOnChange = ({
    target: { name, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: parseInt(id),
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
              <CustomDropdown
                data={states}
                name="state_id"
                onChange={({
                  target: { value, id },
                }: React.ChangeEvent<HTMLInputElement>) => {
                  getDestrict(parseInt(id));
                  setValues({
                    ...values,
                    brand: value,
                  });
                }}
                defaultSelect="States"
              />
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24}>
              <CustomDropdown
                disabled={destrict?.length > 0 ? false : true}
                data={destrict}
                name="lga_id"
                onChange={onselectionchange}
                defaultSelect="Destrict"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={brands}
                name="brand"
                onChange={({
                  target: { value, id },
                }: React.ChangeEvent<HTMLInputElement>) => {
                  getModels(parseInt(id));
                  setValues({
                    ...values,
                    brand: value,
                  });
                }}
                defaultSelect="Brand"
                error={error?.brand}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                disabled={models?.length > 0 ? false : true}
                name="model"
                data={models}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) => {
                  setValues({
                    ...values,
                    model: value,
                  });
                }}
                defaultSelect="Model"
                error={error?.model}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={condition}
                onChange={selectOnChange}
                defaultSelect="Condition"
                name="condition"
                error={error?.condition}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                onChange={selectOnChange}
                defaultSelect="Second Condition"
                name="second_condition"
                error={error?.second_condition}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={registerData.model}
                name="ram"
                onChange={selectOnChange}
                defaultSelect="Ram"
                error={error?.ram}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                name="internal_storage"
                onChange={selectOnChange}
                defaultSelect="Internal Storage"
                error={error?.internal_storage}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={screen_size}
                name="screen_size"
                onChange={selectOnChange}
                defaultSelect="Screen Size"
                error={error?.screen_size}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={colors}
                name="color"
                onChange={selectOnChange}
                defaultSelect="Colour"
                error={error?.color}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={registerData.model}
                name="operating_system"
                onChange={selectOnChange}
                defaultSelect="Operating System"
                error={error?.operating_system}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                name="display_type"
                onChange={selectOnChange}
                defaultSelect="Display Type"
                error={error?.display_type}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={registerData.model}
                name="resolution"
                onChange={selectOnChange}
                defaultSelect="Resolution"
                error={error?.resolution}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                name="sim"
                onChange={selectOnChange}
                defaultSelect="SIM"
                error={error?.sim}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={registerData.model}
                name="card_slot"
                onChange={selectOnChange}
                defaultSelect="Card Slot"
                error={error?.card_slot}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                name="main_camera"
                onChange={selectOnChange}
                defaultSelect="Main Camera"
                error={error?.main_camera}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} md={12} className="pr">
              <CustomDropdown
                data={registerData.model}
                name="selfie_camera"
                onChange={selectOnChange}
                defaultSelect="Selfie Camera"
                error={error?.selfie_camera}
              />
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomDropdown
                data={registerData.model}
                name="battery"
                onChange={selectOnChange}
                defaultSelect="Battery (mAh)"
                error={error?.battery}
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
