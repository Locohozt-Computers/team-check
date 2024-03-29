import React, { useState } from "react";
import { useAuth } from "context/auth/AuthProvider";
import { usePaystackPayment } from "react-paystack";
import styled from "styled-components";

type PProps = {
  amount: any;
  email: string;
  handleSuccess?: any;
  handleClose?: any;
  saveTransaction?: any;
  description?: string;
  background?: string;
  trans_type?: number;
  reference?: any;
  style?: any;
  onClick?: any;
  showNumber?: boolean;
  label?: string;
  charges: number;
  userId?: any;
};

const PAYSTACK_PUB_KEY = process.env.REACT_APP_PAYSTACK_PUB_KEY;

const PayStack = ({
  amount,
  email,
  handleSuccess,
  handleClose,
  saveTransaction,
  description = "Fund wallet",
  trans_type = 1,
  reference,
  background = "transparent",
  style,
  showNumber,
  label,
  onClick,
  charges,
  userId,
}: PProps) => {
  const [ref, setRef] = useState(new Date().getTime());

  const { user } = useAuth();

  const config: any = {
    reference: ref,
    email,
    amount: amount * 100,
    publicKey: PAYSTACK_PUB_KEY,
    metadata: {
      user_id: user.id,
      description,
      trans_type,
      charges,
      amount,
    },
  };

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = (response: any) => {
    const obj = {
      charges,
      response,
    };

    saveTransaction(obj);

    setRef(new Date().getTime());
  };

  // you can call this function anything
  const onClose = () => {
    setRef(new Date().getTime());
  };

  return (
    <ButtonStyle
      background={background}
      style={style}
      onClick={() => {
        initializePayment(onSuccess, onClose);
        if (onClick) {
          onClick();
        }
      }}
    >
      {showNumber ? `${amount}` : `${label} N(${amount})`}
      {/* N{amount} */}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{ background?: string }>`
  width: 100%;
  height: 44px;
  border: 1px solid #cccccc;
  outline: none;
  background-color: ${({ background }) =>
    background ? background : "transparent"};
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
`;

export default PayStack;
