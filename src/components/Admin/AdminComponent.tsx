import CustomButton from "components/ui/CustomButton";
import { AdminContext } from "context/admin/AdminProvider";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Col, Row } from "reactstrap";
import styled from "styled-components";

const AdminComponent = () => {
  const history = useHistory();

  const { commission, warrantyPeriod } = useContext(AdminContext);

  console.log(warrantyPeriod);

  return (
    <Container>
      <Row>
        <Col>
          <div className="card">
            <h5>Registration</h5>
            <div className="count">
              <span>&#8358;</span>
              <span>&#8358; {commission?.registration}</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="card">
            <h5>Warranty</h5>
            <div className="count">
              <i className="fas fa-shield-alt"></i>
              <span>{commission?.warranty}%</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="card">
            <h5>Warranty offset Period</h5>
            <div className="count">
              <i></i>
              <span>
                {warrantyPeriod?.warranty_offset_period}{" "}
                {warrantyPeriod?.warranty_offset_period > 1
                  ? "Months"
                  : "Month"}
              </span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="card">
            <h5>Warranty Expiry</h5>
            <div className="count">
              <i></i>
              <span>
                {warrantyPeriod?.warranty_validity}{" "}
                {warrantyPeriod?.warranty_validity > 1 ? "Months" : "Month"}
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <br />
      <br />

      <Row>
        <Col>
          <div className="action">
            <CustomButton
              label="Setup Commission"
              background="orangered"
              onClick={() => history.push("/admin/setup/commission")}
              style={{
                width: 200,
                marginRight: 20,
              }}
            />
            <CustomButton
              label="Setup Warranty period"
              background="orangered"
              onClick={() => history.push("/admin/setup/warrantyperiod")}
              style={{
                width: 200,
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
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
  }
`;

export default AdminComponent;
