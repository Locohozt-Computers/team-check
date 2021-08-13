import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  amount: string;
  period: number;
};

const SubscriptionPlanCard: React.FC<Props> = ({ name, amount, period }) => {
  return (
    <Card>
      <h3>{name}</h3>
      <p className="amount">{amount}</p>
      <p className="period">
        {period} {period > 1 ? "Months" : "Month"}
      </p>
    </Card>
  );
};

const Card = styled.div`
  max-width: 200px;
  width: 100%;
  border: 1px solid #cccccc;
  text-align: center;
  border-radius: 8px;

  h3,
  p {
    padding: 10px 0;
    border-bottom: 1px solid #cccccc;
    margin: 0;
    font-size: 20px;

    :last-child {
      border: hidden;
    }
  }

  h3 {
    background-color: #ffd857ac;
    font-weight: bolder;
    text-transform: capitalize;
    font-size: 25px;
  }
`;

export default SubscriptionPlanCard;
