import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import { formatPrice } from "utils/formatPrice";

const PhoneDetail = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  const { getADevice, device_detail } = useContext(RegisterPhoneContext);

  useEffect(() => {
    getADevice(deviceId);
  }, []);

  console.log("device detail === ", device_detail);
  return (
    <HomeLayout>
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
            </div>
          </Col>
        </Row>
      </Wrapper>
    </HomeLayout>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: 20px;
  height: 80vh;

  .image {
    height: 100%;
    width: 100%;
  }

  .content {
    h2,
    p {
      margin: 0;
    }

    p {
      color: #c5c7e2;
    }
  }
`;

export default PhoneDetail;
