import React from "react";
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

const PhoneDetail = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const history = useHistory();

  const { getADevice, device_detail, deleteRegisterPhone, loading } =
    useContext(RegisterPhoneContext);

  useEffect(() => {
    getADevice(deviceId);

    // eslint-disable-next-line
  }, []);

  const deletePhone = async () => {
    try {
      if (deviceId) {
        await deleteRegisterPhone(deviceId);
        history.push("/phones");
      }
    } catch (error) {
      console.log(error);
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
            </Col>
            <Col sm={24} md={12}>
              <div className="content">
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
                </Row>
                <br />
                <br />
                <Row>
                  <Col sm={24} md={12}>
                    <CustomButton
                      label="Delete Phone"
                      background="orangered"
                      onClick={deletePhone}
                    />
                  </Col>
                </Row>
                <br />
              </div>
            </Col>
          </Row>
        </Wrapper>
      )}
    </HomeLayout>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  background-color: white;

  .image {
    height: 60vh;
    width: 100%;
    background-color: white;
    overflow-y: hidden;

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

    h2{
      font-size: 16px;
    }
  }
`;

export default PhoneDetail;
