import React, { Dispatch, SetStateAction, useState } from "react";
import { Row, Col, Form, Input, Checkbox } from "antd";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container } from "./style";
import CustomInput from "components/ui/CustomInput";
import { CSSProperties } from "styled-components";
import CustomDropdown from "components/ui/CustomDropdown";
import { useHistory } from "react-router-dom";

const pr: CSSProperties = {
  paddingRight: 10,
};

const pl: CSSProperties = {
  paddingLeft: 10,
};

type Props = {
  values: any;
  setValues: Dispatch<SetStateAction<any>>;
};

const RegisterPhoneForm: React.FC<Props> = ({ setValues, values }) => {
  const history = useHistory();

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
        <h1>
          <i
            className="fas fa-arrow-left"
            style={{ marginRight: 20, cursor: "pointer" }}
            onClick={() => history.goBack()}
          ></i>{" "}
          Register A Phone
        </h1>
        <br />
        <br />
        <Row gutter={16}>
          <Col span={24}>
            <CustomInput placeholder="" onChange={() => {}} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Brand" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Model" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Condition" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Second Condition" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Ram" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Internal Storage" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Screen Size" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Colour" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Operating System" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Display Type" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Resolution" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="SIM" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Card Slot" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Main Camera" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={24} md={12} className="pr">
            <CustomDropdown data={[]} defaultSelect="Selfie Camera" />
          </Col>
          <Col xs={24} md={12} className="pl">
            <CustomDropdown data={[]} defaultSelect="Battery (mAh)" />
          </Col>
        </Row>
        <br />
        <Row>
          <Form.Item style={{ width: "100%" }}>
            <Input.TextArea placeholder="Description" rows={4} />
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
          <Checkbox onChange={() => {}}>Negotiable</Checkbox>
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
      </Container>
    </HomeLayout>
  );
};

export default RegisterPhoneForm;
