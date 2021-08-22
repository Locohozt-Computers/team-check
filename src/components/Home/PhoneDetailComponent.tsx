import React from "react";
import styled from "styled-components";
import { Col, Row } from "antd";
import { formatPrice } from "utils/formatPrice";

type Props = {
  device_detail: any;
};

const PhoneDetailComponent: React.FC<Props> = ({ device_detail }) => {
  return (
    <Wrapper>
      <Row>
        <Col sm={24}>
          <div className="image">
            <img src={device_detail?.images[0]} alt={device_detail?.id} />
          </div>
        </Col>
        <Col sm={24}>
          <div className="content">
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Brand</p>
                <h2>{device_detail?.brand?.name}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Model</p>
                <h2>{device_detail?.phone_model?.name}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>condition</p>
                <h2>{device_detail?.condition?.name}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Battery</p>
                <h2>{device_detail?.battery}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Internal Storage</p>
                <h2>{device_detail?.internal_storage}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Ram</p>
                <h2>{device_detail?.ram?.name}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Operating System</p>
                <h2>Android</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Card</p>
                <h2>{device_detail?.card_slot}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Selfie Camera</p>
                <h2>{device_detail?.selfie_camera}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Main Camera</p>
                <h2>{device_detail?.main_camera}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Resolution</p>
                <h2>{device_detail?.resolution}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Screen Size</p>
                <h2>{device_detail?.screenSize?.name}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>SIM</p>
                <h2>{device_detail?.sim}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Color</p>
                <h2>{device_detail?.color?.name}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>State</p>
                <h2>{device_detail?.state?.name}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Destrict</p>
                <h2>{device_detail?.localGovt?.name}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Description</p>
                <h2>{device_detail?.description}</h2>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Price</p>
                <h2>{formatPrice(device_detail?.amount)}</h2>
              </Col>
              <Col sm={24} md={12}>
                <p style={{textAlign: "start"}}>Warranty Commission</p>
                <h2>{formatPrice(device_detail?.warrantyCommission)}</h2>
              </Col>
            </Row>
            <br />
            <br />
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;

  .image {
    height: 500px;
    width: 100%;
    background-color: white;
    overflow-y: hidden;

    img {
      width: 100%;
    }
  }

  .content {
    padding: 10px 30px;
    height: 400px;
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

export default PhoneDetailComponent;
