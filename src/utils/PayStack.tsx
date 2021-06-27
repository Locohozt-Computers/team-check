import { AuthContext } from "context/auth/AuthProvider";
import { WalletContext } from "context/wallet/WalletProvider";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router";
import styled from "styled-components";
import { successNotify } from "./errorMessage";

type PProps = {
  amount: any;
  email: string;
  handleSuccess?: any;
  handleClose?: any;
  setStateAmount?: Dispatch<SetStateAction<number>>;
  setShowFundWalletModal?: Dispatch<SetStateAction<boolean>>;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  stateAmount: number;
  saveTransaction?: any;
  description?: string;
  background?: string;
  trans_type?: number;
  style?: any;
  onClick?: any;
  showNumber?: boolean;
  label?: string;
  charges: number;
  route?: string;
};

const PAYSTACK_PUB_KEY = process.env.REACT_APP_PAYSTACK_PUB_KEY;

const PayStack = ({
  amount,
  email,
  handleSuccess,
  handleClose,
  setStateAmount,
  stateAmount,
  saveTransaction,
  description = "Fund wallet",
  trans_type = 1,
  background = "transparent",
  style,
  showNumber,
  label,
  onClick,
  charges,
  route = "/",
  setShowFundWalletModal,
  setShowModal,
}: PProps) => {
  const [ref, setRef] = useState(new Date().getTime());
  const history = useHistory();

  const { fundWalletContext } = useContext(WalletContext);
  const { user } = useContext(AuthContext);

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
    },
  };

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = (response: any) => {
    const fundWallet = async () => {
      try {
        await fundWalletContext({
          trxref: response?.trxref,
          amount: amount - charges,
          reference: response?.reference,
        });

        history.push(route);
        if (setStateAmount) {
          setStateAmount(amount - charges + stateAmount);
        }
        if (setShowFundWalletModal) {
          setShowFundWalletModal(false);
        }
        if (setShowModal) {
          setShowModal(false);
        }

        successNotify("Successfully funded your wallet");
      } catch (error) {}
    };

    fundWallet();

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
      {showNumber ? `N${amount}` : `${label} N(${amount})`}
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
