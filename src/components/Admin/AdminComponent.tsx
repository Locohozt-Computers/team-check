import CustomButton from "components/ui/CustomButton";
import { AdminContext } from "context/admin/AdminProvider";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Col, Row } from "reactstrap";
import styled from "styled-components";
import Agents from "./Agents";
import Users from "./Users";

const AdminComponent = () => {
  const history = useHistory();

  const { commission, warrantyPeriod } = useContext(AdminContext);

  const data = [
    {
      id: 1,
      item: <span>&#8358; {commission?.registration}</span>,
      title: "Registration",
      icon: <span>&#8358;</span>,
    },
    {
      id: 2,
      item: <span>{commission?.warranty}%</span>,
      title: "Warranty",
      icon: <i className="fas fa-shield-alt"></i>,
    },
    {
      id: 3,
      item: (
        <span>
          {warrantyPeriod?.warranty_offset_period}{" "}
          {warrantyPeriod?.warranty_offset_period > 1 ? "Months" : "Month"}
        </span>
      ),
      title: "Warranty offset Period",
      icon: <i></i>,
    },
    {
      id: 4,
      item: (
        <span>
          {warrantyPeriod?.warranty_validity}{" "}
          {warrantyPeriod?.warranty_validity > 1 ? "Months" : "Month"}
        </span>
      ),
      title: "Warranty Expiry",
      icon: <i></i>,
    },
  ];

  return (
    <Container>
      <h2>Dashboard</h2>
      <Row>
        {data?.map((item) => (
          <Col>
            <div className="card" key={item.id}>
              <h5>{item?.title}</h5>
              <div className="count">
                {item?.icon}
                {item.item}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <br />
      <br />

      <Row>
        <Col>
          <div className="action">
            {/* <Col xs={12} sm={12} md={{ size: "2", offset: "6" }}> */}
            <CustomButton
              label="Add Phone Brand"
              background="orangered"
              onClick={() => history.push("/admin/setup/phone-brand")}
              style={{
                width: 170,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <CustomButton
              label="Add Phone Model"
              background="orangered"
              onClick={() => history.push("/admin/setup/phone-model")}
              style={{
                width: 170,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            <CustomButton
              label="Setup Commission"
              background="orangered"
              onClick={() => history.push("/admin/setup/commission")}
              style={{
                width: 170,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            {/* </Col> */}
            {/* <Col xs={12} sm={12} md={2}> */}
            <CustomButton
              label="Setup Warranty period"
              background="orangered"
              onClick={() => history.push("/admin/setup/warrantyperiod")}
              style={{
                width: 170,
                marginBottom: 10,
                marginRight: 10,
              }}
            />
            {/* </Col> */}
            {/* <Col xs={12} sm={12} md={2}> */}
            <CustomButton
              label="Invite Admin"
              background="orangered"
              onClick={() => history.push("/admin/setup/inviteadmin")}
              style={{
                width: 100,
                marginBottom: 10,
              }}
            />
            {/* </Col> */}
          </div>
        </Col>
      </Row>

      <br />
      <br />

      <Row>
        <Col>
          <Agents />
        </Col>
        <Col>
          <Users />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 40px;

  .card {
    background-color: white;
    padding: 10px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h5 {
      font-size: 18px;
    }

    .count {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

export default AdminComponent;
