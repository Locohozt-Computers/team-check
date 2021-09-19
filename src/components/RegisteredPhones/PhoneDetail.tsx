import React, { useState } from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { formatPrice } from "utils/formatPrice";
import CustomButton from "components/ui/CustomButton";
import Loader from "components/ui/Loader";
import CustomModalUI from "components/ui/CustomModal";
import { SelectCards, SelectActions, SelectCard } from "components/Wallet";
import SubscriptionPlan from "./SubscriptionPlan";
import { AuthContext } from "context/auth/AuthProvider";
import {
  ButtonStyle,
  PayStackChargeModalDiv,
} from "components/Wallet/FundWallet";
import { paystackCharge } from "utils/paystackCharge";
import PayStack from "utils/PayStack";
import { errorNotify, successNotify } from "utils/errorMessage";

// SMG-21-86B2F5

const PhoneDetail = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const [type, setType] = useState("");

  const [modal, setModal] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [isAmount, setisAmount] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [plan, setPlan] = useState({
    id: 0,
    name: "",
    amount: "",
    period: 0,
  });
  const [pay_type, setPayType] = useState(0);
  const [isWarranty, setIsWarranty] = useState(false);

  const history = useHistory();

  const { user } = useContext(AuthContext);
  const {
    device_detail,
    loading,
    getADevice,
    deleteRegisterPhone,
    subscribePhoneForAdvert,
    renewWarranty,
  } = useContext(RegisterPhoneContext);

  useEffect(() => {
    getADevice(deviceId);
    setIsWarranty(device_detail?.warranty);

    // eslint-disable-next-line
  }, [device_detail?.warranty]);

  const deletePhone = async () => {
    try {
      if (deviceId) {
        await deleteRegisterPhone(deviceId);
        successNotify("Phone deleted successfully");
        history.push("/phones");
      }
    } catch (error: any) {
      errorNotify(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong,try again"
      );
    }
  };

  const listPhoneFunc = async (response?: any) => {
    try {
      const obj = {
        plan_id: plan?.id,
        price: plan?.amount,
        pay_type,
        trxref: response ? response?.response?.trxref : "",
        device_id: deviceId,
      };

      await subscribePhoneForAdvert(obj);
      setisAmount(false);
      setIsSell(false);
      setShowWalletModal(false);

      successNotify("Successfully added phone to advert");
    } catch (error) {}
  };

  const renewWarrantyFunc = async (response?: any) => {
    try {
      if (deviceId) {
        const payload = {
          trxref: response ? response?.response?.trxref : "",
          reference: response ? response?.response?.reference : "",
          device_id: deviceId,
          pay_type,
        };
        await renewWarranty(payload);
      }
    } catch (error) {}
  };

  const choosePlan = async (response?: any) => {
    try {
      if (deviceId) {
        switch (type) {
          case "listPhone":
            listPhoneFunc(response);
            break;
          case "renewWarranty":
            renewWarrantyFunc(response);
            break;
          default:
            return () => {};
        }
      }
    } catch (error: any) {
      errorNotify(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong,try again"
      );
    }
  };

  return (
    <HomeLayout>
      {loading ? (
        <div>
          <Loader width={30} />
        </div>
      ) : (
        <Wrapper>
          <Row>
            <Col sm={24} md={12}>
              <div className="image">
                <img src={device_detail?.images[0]} alt={device_detail?.id} />
              </div>
              {/* <Row>
                <Col xs={24} md={7}>
                  {user?.user_type === "AGENT" && (
                    <CustomButton
                      label="Delete Phone"
                      background="orangered"
                      style={{ width: 150 }}
                      onClick={() => {
                        setModal(true);
                      }}
                    />
                  )}
                </Col>
                <Col xs={24} md={7}>
                  {user?.user_type === "USER" && (
                    <CustomButton
                      label="List Phone"
                      style={{ width: 100 }}
                      background="dodgerblue"
                      onClick={() => {
                        setIsSell(true);
                      }}
                    />
                  )}
                </Col>
                <Col xs={24} md={7}>
                  {user?.user_type === "AGENT" && (
                    <CustomButton
                      label="Renew Warranty"
                      style={{ maxWidth: 150 }}
                      background="green"
                      onClick={() => {
                        setIsSell(true);
                      }}
                    />
                  )}
                </Col>
              </Row> */}
            </Col>
            <Col sm={24} md={12}>
              <div className="content">
                <Row>
                  <Col sm={24} md={12}>
                    <p>Device ID</p>
                    <h2>{device_detail?.id}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Brand</p>
                    <h2>{device_detail?.brand?.name}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Model</p>
                    <h2>{device_detail?.phone_model?.name}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>condition</p>
                    <h2>{device_detail?.condition?.name}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Battery</p>
                    <h2>{device_detail?.battery}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Internal Storage</p>
                    <h2>{device_detail?.internal_storage}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Ram</p>
                    <h2>{device_detail?.ram?.name}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Operating System</p>
                    <h2>Android</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Card</p>
                    <h2>{device_detail?.card_slot}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Selfie Camera</p>
                    <h2>{device_detail?.selfie_camera}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Main Camera</p>
                    <h2>{device_detail?.main_camera}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Resolution</p>
                    <h2>{device_detail?.resolution}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Screen Size</p>
                    <h2>{device_detail?.screenSize?.name}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>SIM</p>
                    <h2>{device_detail?.sim}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Color</p>
                    <h2>{device_detail?.color?.name}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>State</p>
                    <h2>{device_detail?.state?.name}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Destrict</p>
                    <h2>{device_detail?.localGovt?.name}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Description</p>
                    <h2>{device_detail?.description}</h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Price</p>
                    <h2>{formatPrice(device_detail?.amount)}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Warranty Amount</p>
                    <h2>
                      {device_detail?.warrantyCommision
                        ? formatPrice(device_detail?.warrantyCommision)
                        : "N/A"}
                    </h2>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <p>Warranty Start</p>
                    <h2>{device_detail?.warranty_start}</h2>
                  </Col>
                  <Col sm={24} md={12}>
                    <p>Warranty End</p>
                    <h2>{device_detail?.warranty_expiry}</h2>
                  </Col>
                </Row>
                <br />
                <br />
                <Row>
                  <Col xs={24} md={8}>
                    {user?.user_type === "AGENT" && (
                      <CustomButton
                        label="Delete Phone"
                        background="orangered"
                        style={{ width: 150 }}
                        onClick={() => {
                          setModal(true);
                        }}
                      />
                    )}
                  </Col>
                  <Col xs={24} md={8}>
                    {user?.user_type === "USER" && (
                      <CustomButton
                        label="List Phone"
                        style={{ width: 100 }}
                        background="dodgerblue"
                        onClick={() => {
                          setType("listPhone");
                          setIsSell(true);
                        }}
                      />
                    )}
                  </Col>
                  <Col xs={24} md={8}>
                    {user?.user_type === "USER" && (
                      <CustomButton
                        label="Renew Warranty"
                        style={{ width: 150 }}
                        disabled={isWarranty}
                        background={isWarranty ? "grey" : "green"}
                        onClick={() => {
                          setType("renewWarranty");
                          setPlan({
                            ...plan,
                            amount: device_detail?.warrantyCommission,
                          });
                          setisAmount(true);
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <br />
              </div>
            </Col>
          </Row>
        </Wrapper>
      )}

      <CustomModalUI
        visible={isSell}
        component={() => {
          return (
            <SelectCards>
              <h1>Select Plan</h1>
              <SubscriptionPlan setValue={setPlan} setisOpen={setisAmount} />
              <br />
            </SelectCards>
          );
        }}
        handleCancel={() => setIsSell(false)}
        width={550}
        closable={false}
      />

      <CustomModalUI
        visible={modal}
        component={() => {
          return (
            <SelectCards>
              <h1>Delete Phone</h1>
              <p>Are you sure you want to delete this phone?</p>
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  <span>No</span>
                </SelectCard>
                <SelectCard onClick={deletePhone}>
                  <span>Yes</span>
                </SelectCard>
              </SelectActions>
            </SelectCards>
          );
        }}
        handleCancel={() => {}}
        width={350}
        closable={false}
      />

      {/* payment mode */}
      <CustomModalUI
        visible={isAmount}
        component={() => {
          return (
            <SelectCards>
              <h1>Select Payment Option</h1>
              <p>Please select your mode of payment</p>
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setPayType(1);
                    setShowPayModal(true);
                    setIsSell(false);
                  }}
                >
                  <i className="fas fa-university"></i>
                  <span>Card</span>
                </SelectCard>
                <SelectCard
                  onClick={() => {
                    setPayType(0);
                    setShowWalletModal(true);
                    setIsSell(false);
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
          setisAmount(false);
        }}
        width={350}
        closable={false}
      />

      {/* paystack card  */}
      <CustomModalUI
        component={() => (
          <PayStackChargeModalDiv>
            <h1>Paystack Charge</h1>
            <p>
              Pay stack charges you{" "}
              {formatPrice(paystackCharge(parseInt(plan?.amount)))}
            </p>
            <div className="action_btns">
              <ButtonStyle
                style={{ padding: 2 }}
                disabled={!plan?.amount}
                onClick={() => {
                  setShowPayModal(false);
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
                    parseInt(plan?.amount) +
                    paystackCharge(parseInt(plan?.amount))
                  }
                  userId={user.id}
                  charges={paystackCharge(parseInt(plan?.amount))}
                  email={user?.email ? user.email : ""}
                  trans_type={2}
                  saveTransaction={choosePlan}
                  description={`Fund wallet with ${parseInt(plan?.amount)}`}
                  label={"Pay"}
                  showNumber={true}
                />
              )}
            </div>
          </PayStackChargeModalDiv>
        )}
        visible={showPayModal}
        handleCancel={() => {}}
        width={300}
        closable={false}
      />

      {/* wallet card payment */}
      <CustomModalUI
        visible={showWalletModal}
        component={() => {
          return (
            <SelectCards>
              <p>Your mode of payment is wallet</p>
              <p>
                Are you sure you want to subscribe with this package,{" "}
                {plan?.amount}
              </p>
              <SelectActions>
                <SelectCard
                  onClick={() => {
                    setShowWalletModal(false);
                  }}
                >
                  <span>No</span>
                </SelectCard>
                <SelectCard onClick={choosePlan}>
                  <span>Yes</span>
                </SelectCard>
              </SelectActions>
            </SelectCards>
          );
        }}
        handleCancel={() => {
          setisAmount(false);
        }}
        width={350}
        closable={false}
      />
    </HomeLayout>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  background-color: white;
  overflow-y: auto;

  .image {
    max-height: 70vh;
    width: 100%;
    background-color: white;
    overflow-y: hidden;
    margin-bottom: 30px;

    img {
      width: 100%;
    }
  }

  .content {
    padding: 10px 30px;
    height: 80vh;
    background-color: white;
    overflow-y: auto;
    h2,
    p {
      margin: 0;
    }

    p {
      color: #c5c7e2;
    }

    h2 {
      font-size: 16px;
    }
  }
`;

export default PhoneDetail;
