import React, { useContext } from "react";
import styled from "styled-components";

import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import Title from "components/ui/Title";

type Props = {
  setValue?: any;
  setisOpen?: any;
};

const SubscriptionPlan: React.FC<Props> = ({ setValue, setisOpen }) => {
  const { subscription_plans } = useContext(RegisterPhoneContext);
  return (
    <>
      <Title title="Suscription Plans"></Title>
      <br />
      <Wrapper>
        <Cards>
          {subscription_plans?.map((plan: any) => (
            <SubscriptionPlanCard
              {...plan}
              setValue={setValue}
              setIsOpen={setisOpen}
            />
          ))}
        </Cards>
      </Wrapper>
    </>
  );
};

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 700px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default SubscriptionPlan;
