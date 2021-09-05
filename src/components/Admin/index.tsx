import React from "react";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import SetupCommssion from "./SetupCommssion";
import SetupWarrantyPeriod from "./SetupWarrantyPeriod";

const AdminSetup = () => {
  return (
    <Container>
      <h1>Admin Setup</h1>
      <Row>
        <Col>
          <SetupCommssion />
        </Col>
        <Col>
          <SetupWarrantyPeriod />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default AdminSetup;
