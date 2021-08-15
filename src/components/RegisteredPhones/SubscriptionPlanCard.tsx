import React from "react";
import styled from "styled-components";

type Props = {
  id: number;
  name: string;
  amount: string;
  period: number;
  setValue?: any;
  setIsOpen?: any;
};

const SubscriptionPlanCard: React.FC<Props> = ({
  id,
  name,
  amount,
  period,
  setValue,
  setIsOpen,
}) => {
  return (
    <Card
      onClick={() => {
        setValue({
          id,
          amount,
          name,
          period,
        });
        setIsOpen(true);
      }}
    >
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
  margin-right: 10px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

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
