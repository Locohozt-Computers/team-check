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
import CustomModalUI from "components/ui/CustomModal";
import { SelectCards, SelectActions, SelectCard } from "components/Wallet";
import {
  AmountToFundWallet,
  ButtonStyle,
  MakePayment,
  ParagraphOne,
  PayStackChargeModalDiv,
} from "components/Wallet/FundWallet";
import { formatPrice } from "utils/formatPrice";
import { paystackCharge } from "utils/paystackCharge";
import Loader from "components/ui/Loader";
import PayStack from "utils/PayStack";

type Props = {
  values: RegisterValueType;
  errors: RegisterValueType;
  setValues: Dispatch<SetStateAction<any>>;
  setErrors: Dispatch<SetStateAction<any>>;
  onSubmit: () => Promise<void>;
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
    reg_fee,
    getModels,
    getDestrict,
    getOthers,
    getOperatingSystem,
    getRegUser,
  } = useContext(RegisterPhoneContext);

  const userFromLocalStorage: any = localStorage.getItem("techCheckPoint");
  const user = JSON.parse(userFromLocalStorage);

  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [, setShowTransferToWallet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPayChargeModal, setShowPayChargeModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [amountCharges] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [index, setIndex] = useState<number>();

  // const inputOnChange = ({
  //   target: { value, name },
  // }: React.ChangeEvent<HTMLInputElement>) => {
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  console.log("others === ", reg_fee, values.amount);

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
      user_id: reg_user ? reg_user?.id : 0,
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
    reg_user?.id,
    reg_fee?.fee,
  ]);

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    getRegUser(value);
  };

  async function confirm(obj: any) {
    setValues({
      ...values,
      trxref: obj?.trxref,
      reference: obj?.reference,
    });
    setShowFundWalletModal(false);
    setShowModal(false);
  }

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
        <FormStyle
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();

            setShowModal(true);
          }}
        >
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
            {/* <Col xs={24} md={12} className="pl">
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
            </Col> */}
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
            <Col xs={24} md={12} className="pr">
              <Select
                className="select"
                options={rams}
                placeholder="Ram"
                onChange={({ id }: any) => {
                  setValues({
                    ...values,
                    ram_size_id: id,
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
            <Col xs={24} md={24} className="pr">
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
          {/* <Row>
            <CustomInput
              placeholder="Price"
              name="price"
              value={values.price}
              onChange={inputOnChange}
            />
          </Row>
          <br /> */}
          <Row>
            <Checkbox
              onChange={({ target: { checked } }) =>
                setValues({
                  ...values,
                  warranty: checked ? 1 : 0,
                  amount: checked
                    ? others?.warranty_fee && reg_fee?.fee
                      ? parseInt(others?.warranty_fee) + parseInt(reg_fee?.fee)
                      : ""
                    : "",
                })
              }
            >
              Warranty{" "}
              {others?.warranty_fee &&
                values.warranty === 1 &&
                `(N ${others?.warranty_fee})`}
            </Checkbox>
          </Row>
          <br />
          {/* <Row>
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
          <br /> */}
          <Row>
            <CustomButton
              type="submit"
              label="Submit"
              background="dodgerblue"
            />
          </Row>
        </FormStyle>
      </Container>

      <CustomModalUI
        visible={showModal}
        component={() => {
          return (
            <SelectCards>
              <h1>Select Payment Option</h1>
              <p>Please select your mode of payment</p>
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setValues({
                      ...values,
                      pay_type: 1,
                    });
                    setShowFundWalletModal(true);
                    setShowModal(false);
                  }}
                >
                  <i className="fas fa-university"></i>
                  <span>Bank</span>
                </SelectCard>
                <SelectCard
                  onClick={() => {
                    setValues({
                      ...values,
                      pay_type: 0,
                    });
                    onSubmit();
                    setShowTransferToWallet(true);
                    setShowModal(false);
                  }}
                >
                  <i className="fas fa-wallet"></i>
                  <span>Wallet</span>
                </SelectCard>
              </SelectActions>
            </SelectCards>
          );
        }}
        handleCancel={() => {
          setValues({
            ...values,
            amount: "",
          });
          setShowModal(false);
        }}
        width={350}
        closable={false}
      />

      <CustomModalUI
        visible={showFundWalletModal}
        component={() => {
          return (
            <MakePayment>
              <ParagraphOne>Register Amount</ParagraphOne>

              <span className="label">Quick Pay</span>
              <AmountToFundWallet>
                {[1000, 2000, 3000, 4000]?.map((amount: number, i: number) => (
                  <ButtonStyle
                    key={i}
                    style={{
                      background: index === i ? "#FF2A5F" : "transparent",
                    }}
                    onClick={() => {
                      setValues({
                        ...values,
                        amount,
                      });
                      setIndex(i);
                      setShowModal(true);
                    }}
                  >
                    {amount}
                  </ButtonStyle>
                ))}
              </AmountToFundWallet>
              <p style={{ color: "white" }}>
                Paystack charges{" "}
                {formatPrice(
                  paystackCharge(
                    parseInt(values.amount)
                      ? parseInt(values.amount)
                      : amountCharges
                  )
                )}
              </p>
              <br />
              <span className="label">Large Amount</span>
              <CustomInput
                placeholder="Enter Amount"
                type="number"
                value={values.amount}
                onChange={({
                  target: { value },
                }: React.ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    amount: value,
                  })
                }
                inputStyle={{ color: "white" }}
              />
              <br />
              <ButtonStyle
                disabled={!values.amount}
                style={{ padding: 10 }}
                onClick={() => {
                  setAmount(parseInt(values.amount));
                  setShowPayChargeModal(true);
                }}
              >
                {values.amount ? formatPrice(values.amount) : "Pay"}
              </ButtonStyle>
            </MakePayment>
          );
        }}
        closable
        handleCancel={() => {
          setValues({
            ...values,
            amount: "",
          });
          setShowFundWalletModal(false);
        }}
        width={400}
      />

      <CustomModalUI
        component={() => (
          <PayStackChargeModalDiv>
            <h1>Paystack Charge</h1>
            <p>Pay stack charges you {formatPrice(paystackCharge(amount))}</p>
            <div className="action_btns">
              <ButtonStyle
                style={{ padding: 2 }}
                disabled={!amount}
                onClick={() => {
                  setAmount(0);
                  setShowPayChargeModal(false);
                }}
              >
                Cancel
              </ButtonStyle>
              {false ? (
                <div
                  style={{
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Loader size={0} type="Oval" width={18} height={18} />
                </div>
              ) : (
                <PayStack
                  background={"#FF2A5F"}
                  style={{ height: 27, border: 0 }}
                  amount={
                    values.amount
                      ? paystackCharge(parseInt(values.amount)) +
                        parseInt(values.amount)
                      : 0
                  }
                  charges={paystackCharge(amount)}
                  email={user?.email ? user.email : ""}
                  handleClose={() => {
                    setValues({
                      ...values,
                      amount: "",
                    });
                  }}
                  saveTransaction={confirm}
                  description={`Fund wallet with ${amount}`}
                  label={"Pay"}
                  showNumber={false}
                />
              )}
            </div>
          </PayStackChargeModalDiv>
        )}
        visible={showPayChargeModal}
        handleCancel={() => {
          setValues({
            ...values,
            amount: "",
          });
        }}
        width={300}
        closable={false}
      />
    </HomeLayout>
  );
};

export default RegisterPhoneForm;
