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
  ButtonStyle,
  MakePayment,
  ParagraphOne,
  PayStackChargeModalDiv,
} from "components/Wallet/FundWallet";
import { formatPrice } from "utils/formatPrice";
import { paystackCharge } from "utils/paystackCharge";
import Loader from "components/ui/Loader";
import PayStack from "utils/PayStack";
import { canNotRegisterPhone } from "utils/canNotRegisterPhone";

type Props = {
  values: RegisterValueType;
  showError: boolean;
  setValues: Dispatch<SetStateAction<any>>;
  setShowError: Dispatch<SetStateAction<boolean>>;
  onSubmit: (obj: { reference?: string; trxref?: string }) => Promise<void>;
};

const ErrorDiv = ({
  values,
  name,
  showError,
  key = "",
}: {
  values: any;
  name: string;
  showError: boolean;
  key: any;
}) => {
  const value = !values[key];
  return (
    <>
      {value && showError && (
        <span style={{ color: "red" }}>{name} is a required field</span>
      )}
    </>
  );
};

const RegisterPhoneForm: React.FC<Props> = ({
  setValues,
  values,
  onSubmit,
  setShowError,
  showError,
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
  const [showCharges, setShowCharges] = useState(false);

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState<number>(0);
  const [userEmail, setUserEmail] = useState("");

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

  const onSearch = async ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // setUserEmail(value);
    const user: any = await getRegUser(value);
    if (user) {
      setUserEmail(user);
    } else {
      setUserEmail("");
    }
  };

  async function confirm(obj: any) {
    onSubmit({
      trxref: obj?.response?.trxref,
      reference: obj?.response?.reference,
    });
    setShowPayChargeModal(false);
    setShowFundWalletModal(false);
    setShowModal(false);
  }

  const phoneRegFeeAndWalletFee =
    others?.warranty_fee && reg_fee?.fee
      ? parseInt(others?.warranty_fee) + parseInt(reg_fee?.fee)
      : reg_fee?.fee
      ? reg_fee?.fee
      : others?.warranty_fee;

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
              {values.images?.length <= 0 && showError && (
                <span style={{ color: "red" }}>Image is a required field</span>
              )}
            </Col>
          </Row>
          <br />
          <Row gutter={16}>
            <Col span={24}>
              <Input
                placeholder="Search a user with his/her email..."
                allowClear
                size="large"
                onChange={onSearch}
              />
              {userEmail !== "error" ? (
                <span>{userEmail}</span>
              ) : (
                userEmail?.length > 1 && <span>User not found</span>
              )}
              {!values.user_id && (
                <ErrorDiv
                  key="user_id"
                  values={values}
                  name="User"
                  showError={showError}
                />
              )}
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
              {!values.state_id && (
                <ErrorDiv
                  key="state_id"
                  values={values}
                  name="State"
                  showError={showError}
                />
              )}
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
              {!values.lga_id && (
                <ErrorDiv
                  key="lga_id"
                  values={values}
                  name="Destrict"
                  showError={showError}
                />
              )}
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
              {!values.brand_id && (
                <ErrorDiv
                  key="brand_id"
                  values={values}
                  name="Brand"
                  showError={showError}
                />
              )}
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
              {!values.phone_model_id && (
                <ErrorDiv
                  key="phone_model_id"
                  values={values}
                  name="Model"
                  showError={showError}
                />
              )}
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
              {!values.condition_id && (
                <ErrorDiv
                  key="condition_id"
                  values={values}
                  name="Condition"
                  showError={showError}
                />
              )}
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
              {!values.battery && (
                <ErrorDiv
                  key="battery"
                  values={values}
                  name="Battery"
                  showError={showError}
                />
              )}
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
              {!values.ram_size_id && (
                <ErrorDiv
                  key="ram_size_id"
                  values={values}
                  name="Ram"
                  showError={showError}
                />
              )}
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
              {!values.internal_storage && (
                <ErrorDiv
                  key="internal_storage"
                  values={values}
                  name="Internal Storage"
                  showError={showError}
                />
              )}
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
              {!values.screen_size_id && (
                <ErrorDiv
                  key="screen_size_id"
                  values={values}
                  name="Screen Size"
                  showError={showError}
                />
              )}
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
              {!values.color_id && (
                <ErrorDiv
                  key="color_id"
                  values={values}
                  name="Color"
                  showError={showError}
                />
              )}
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
              {!values.operating_system_id && (
                <ErrorDiv
                  key="operating_system_id"
                  values={values}
                  name="Operating System"
                  showError={showError}
                />
              )}
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
              {!values.display_type && (
                <ErrorDiv
                  key="display_type"
                  values={values}
                  name="Display Type"
                  showError={showError}
                />
              )}
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
              {!values.resolution && (
                <ErrorDiv
                  key="resolution"
                  values={values}
                  name="Resolution"
                  showError={showError}
                />
              )}
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
              {!values.sim && (
                <ErrorDiv
                  key="sim"
                  values={values}
                  name="SIM"
                  showError={showError}
                />
              )}
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
              {!values.card_slot && (
                <ErrorDiv
                  key="card_slot"
                  values={values}
                  name="Card Slot"
                  showError={showError}
                />
              )}
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
              {!values.main_camera && (
                <ErrorDiv
                  key="main_camera"
                  values={values}
                  name="Main Camera"
                  showError={showError}
                />
              )}
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
              {!values.selfie_camera && (
                <ErrorDiv
                  key="selfie_camera"
                  values={values}
                  name="Selfie Camera"
                  showError={showError}
                />
              )}
            </Col>
            <Col xs={24} md={12} className="pl">
              <CustomInput
                placeholder="Enter Price"
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
                inputStyle={{ height: 16 }}
              />
              {!values.amount && (
                <ErrorDiv
                  key="amount"
                  values={values}
                  name="Price"
                  showError={showError}
                />
              )}
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
              {!values.description && (
                <ErrorDiv
                  key="description"
                  values={values}
                  name="Description"
                  showError={showError}
                />
              )}
            </Form.Item>
          </Row>
          <br />
          <Row>
            <Col>
              <Checkbox
                onChange={({ target: { checked } }) =>
                  setValues({
                    ...values,
                    warranty: checked ? 1 : 0,
                  })
                }
              >
                Warranty{" "}
                {others?.warranty_fee &&
                  values.warranty === 1 &&
                  `(N ${others?.warranty_fee})`}
              </Checkbox>
              <br />
              <div>
                {values.warranty === 1 && (
                  <p>
                    Warranty is valid for 1 year and it start from three months
                    from now
                  </p>
                )}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <CustomButton
              disabled={canNotRegisterPhone(values)}
              type="submit"
              label="Submit"
              background={
                canNotRegisterPhone(values) ? "#dddddd" : "dodgerblue"
              }
              style={{
                color: canNotRegisterPhone(values) ? "#222222" : "#ffffff",
              }}
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
                  <span>Card</span>
                </SelectCard>
                <SelectCard
                  onClick={() => {
                    setShowCharges(true);
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
              <ParagraphOne>Pay With Card</ParagraphOne>

              <p style={{ color: "white" }}>
                Phone Price{" "}
                {/* {parseInt(others?.warranty_fee) + parseInt(reg_fee?.fee)} */}
                {phoneRegFeeAndWalletFee}
              </p>
              <br />
              <br />
              <ButtonStyle
                disabled={!values.amount}
                style={{ padding: 10 }}
                onClick={() => {
                  setAmount(parseInt(values.amount));
                  setShowPayChargeModal(true);
                }}
              >
                {values.amount ? formatPrice(phoneRegFeeAndWalletFee) : "Pay"}
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
      {/* <CustomModalUI
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
      /> */}

      <CustomModalUI
        component={() => (
          <PayStackChargeModalDiv>
            <h1>Paystack Charge</h1>
            <p>Pay stack charges you {formatPrice(paystackCharge(phoneRegFeeAndWalletFee))}</p>
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
                  // amount={
                  //   values.amount
                  //     ? paystackCharge(parseInt(values.amount)) +
                  //       parseInt(values.amount)
                  //     : 0
                  // }
                  amount={
                    phoneRegFeeAndWalletFee +
                    paystackCharge(phoneRegFeeAndWalletFee)
                  }
                  userId={values.user_id}
                  charges={paystackCharge(phoneRegFeeAndWalletFee)}
                  email={user?.email ? user.email : ""}
                  trans_type={2}
                  handleClose={() => {
                    setValues({
                      ...values,
                      amount: "",
                    });
                  }}
                  saveTransaction={confirm}
                  description={`Fund wallet with ${phoneRegFeeAndWalletFee}`}
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

      {/* alert for displaying charges */}
      <CustomModalUI
        visible={showCharges}
        component={() => {
          return (
            <SelectCards>
              <h1>Registration Charges</h1>
              <p>
                Are you sure you want to register this phone with this amount,{" "}
                {parseInt(others?.warranty_fee) + parseInt(reg_fee?.fee)}
              </p>
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setShowCharges(false);
                  }}
                >
                  <span>No</span>
                </SelectCard>
                <SelectCard
                  onClick={() => {
                    setValues({
                      ...values,
                      pay_type: 0,
                    });
                    onSubmit({});
                    setShowTransferToWallet(true);
                    setShowModal(false);
                    setShowCharges(false);
                  }}
                >
                  <span>Yes</span>
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
    </HomeLayout>
  );
};

export default RegisterPhoneForm;
