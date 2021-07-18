import React, { Dispatch, SetStateAction, useContext } from "react";
import { Row, Col, Form, Input, Checkbox } from "antd";
import Select from "react-select";
import Spinner from "react-loader-spinner";

import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { Container, FormStyle, AddPhoto, Images, PhotoLists } from "./style";
import CustomInput from "components/ui/CustomInput";
import { useHistory } from "react-router-dom";
import Title from "components/ui/Title";
import { RegisterValueType } from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";
import CustomButton from "components/ui/CustomButton";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { getDropdown } from "utils/getDropdown";
import { useEffect } from "react";
import { multiUploadImage } from "utils/cloudinary/multiupload";
import { useState } from "react";

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
    rams,
    states,
    destrict,
    operating_system,
    others,
    reg_user,
    getModels,
    getDestrict,
    getOthers,
    getOperatingSystem,
    getRegUser,
  } = useContext(RegisterPhoneContext);

  const [loading, setLoading] = useState(false);

  const inputOnChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  // console.log("others === ", others);
  const battery = getDropdown(others?.battery);
  const displayType = getDropdown(others?.display_type);
  const cardSlot = getDropdown(others?.card_slot);
  const mainCamera = getDropdown(others?.main_camera);
  const selfieCamera = getDropdown(others?.selfie_camera);
  const resolution = getDropdown(others?.resolution);
  const sim = getDropdown(others?.sim);
  const storage = getDropdown(others?.storage);

  useEffect(() => {
    setValues({
      ...values,
      battery: battery?.length <= 1 ? battery[0]?.value : "",
      display_type: displayType?.length <= 1 ? displayType[0]?.value : "",
      card_slot: cardSlot?.length <= 1 ? cardSlot[0]?.value : "",
      main_camera: mainCamera?.length <= 1 ? mainCamera[0]?.value : "",
      selfie_camera: selfieCamera?.length <= 1 ? selfieCamera[0]?.value : "",
      resolution: resolution?.length <= 1 ? resolution[0]?.value : "",
      sim: sim?.length <= 1 ? sim[0]?.value : "",
      internal_storage: storage?.length <= 1 ? storage[0]?.value : "",
      category_id: others?.category_id ? others?.category_id : 0,
    });

    // eslint-disable-next-line
  }, [
    others?.battery,
    others?.display_type,
    others?.card_slot,
    others?.main_camera,
    others?.selfie_camera,
    others?.resolution,
    others?.sim,
    others?.internal_storage,
  ]);

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    getRegUser(value);
  };
  console.log(reg_user);

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
            <h2 style={{ color: "#bbbbbb" }}>Add Photos</h2>
            <Col span={24}>
              <Images>
                <AddPhoto htmlFor="upload">
                  <i className="fas fa-plus"></i>
                  <input
                    type="file"
                    multiple={true}
                    accept="image/*"
                    onChange={async ({ target: { files } }) => {
                      setLoading(true);
                      const result: any = await multiUploadImage(files);
                      setLoading(false);

                      setValues({
                        ...values,
                        images: [...values.images, ...result],
                      });
                    }}
                    id="upload"
                  />
                </AddPhoto>
                <PhotoLists>
                  {values.images?.map((image: string, index: number) => (
                    <div key={index} className="img_div">
                      <img src={image} alt="images" />
                      <i
                        className="fas fa-times"
                        onClick={() => {
                          setValues({
                            ...values,
                            images: values.images?.filter(
                              (image: string, ind: number) => ind !== index
                            ),
                          });
                          console.log(index);
                        }}
                      ></i>
                    </div>
                  ))}
                  {loading && (
                    <div className="img_loading">
                      <Spinner type="Oval" width={40} color="white" />
                    </div>
                  )}
                </PhotoLists>
              </Images>
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24}>
              <Input
                placeholder="Search for a user you want to register..."
                allowClear
                size="large"
                onChange={onSearch}
              />
              <span>{reg_user && reg_user?.username}</span>
            </Col>
          </Row>
          <br />
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
                onChange={({ id, osId, os }: any) => {
                  getModels(parseInt(id));
                  getOperatingSystem(os);
                  setValues({
                    ...values,
                    brand_id: id,
                    operating_system_id: osId,
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
                  getOthers(id);
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
                options={rams}
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
                className={storage?.length <= 1 ? "select active" : "select"}
                options={storage}
                placeholder={
                  storage?.length <= 1 ? storage[0]?.value : "Internal Storage"
                }
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
                className={operating_system?.name ? "select active" : "select"}
                options={[operating_system]}
                placeholder={operating_system?.name}
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
                className={
                  displayType?.length <= 1 ? "select active" : "select"
                }
                options={displayType}
                placeholder={
                  displayType?.length <= 1
                    ? displayType[0]?.value
                    : "Display Type"
                }
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
                className={resolution?.length <= 1 ? "select active" : "select"}
                options={resolution}
                placeholder={
                  resolution?.length <= 1 ? resolution[0]?.value : "Resolution"
                }
                value={others?.resolution[0]}
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
                className={sim?.length <= 1 ? "select active" : "select"}
                options={sim}
                placeholder={sim?.length <= 1 ? sim[0]?.value : "SIM"}
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
                className={cardSlot?.length <= 1 ? "select active" : "select"}
                options={cardSlot}
                placeholder={
                  cardSlot?.length <= 1 ? cardSlot[0]?.value : "Card Slot"
                }
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
                className={mainCamera?.length <= 1 ? "select active" : "select"}
                options={mainCamera}
                placeholder={
                  mainCamera?.length <= 1 ? mainCamera[0]?.value : "Main Camera"
                }
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
                className={
                  selfieCamera?.length <= 1 ? "select active" : "select"
                }
                options={selfieCamera}
                placeholder={
                  selfieCamera?.length <= 1
                    ? selfieCamera[0]?.value
                    : "Selfie Camera"
                }
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
                className={battery?.length <= 1 ? "select active" : "select"}
                isDisabled={battery?.length > 1 ? false : true}
                options={battery}
                defaultInputValue={battery?.value}
                placeholder={
                  battery?.length <= 1 ? battery[0]?.value : "Battery (MAH)"
                }
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
