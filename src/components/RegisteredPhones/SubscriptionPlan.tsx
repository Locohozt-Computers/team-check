import React, { useContext } from "react";
import { RegisterPhoneContext } from "context/registerPhone/RegisterPhoneProvider";
import SubscriptionPlanCard from "./SubscriptionPlanCard";
import HomeLayout from "components/layouts/HomeLayout/HomeLayout";
import styled from "styled-components";

const SubscriptionPlan = () => {
  const { subscription_plans } = useContext(RegisterPhoneContext);
  console.log(subscription_plans);
  return (
    <HomeLayout>
      <Wrapper>
        <Cards>
          {subscription_plans?.map((plan: any) => (
            <SubscriptionPlanCard {...plan} />
          ))}
        </Cards>
      </Wrapper>
    </HomeLayout>
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
