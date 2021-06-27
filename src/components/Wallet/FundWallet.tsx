import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import PayStack from "utils/PayStack";
import { paystackCharge } from "utils/paystackCharge";
import CustomModalUI from "components/ui/CustomModal";
import Loader from "components/ui/Loader";
import { formatPrice } from "utils/formatPrice";
import CustomInput from "components/ui/CustomInput";

type Props = {
  setShowFundWalletModal: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number | string>>;
  showFundWalletModal: boolean;
};

const PaymentComponent: React.FC<Props> = ({
  setShowFundWalletModal,
  showFundWalletModal,
  setAmount: setStateAmount
}) => {
  const [amountCharges] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [index, setIndex] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  async function confirm(obj: any) {
    console.log(obj);
    setShowFundWalletModal(false);
    setShowModal(false);
  }

  return (
    <Container>
      <CustomModalUI
        visible={showFundWalletModal}
        component={() => {
          return (
            <MakePayment>
              <ParagraphOne>Fund Wallet</ParagraphOne>

              {/* <MinAmount>
                <span>Min Amount</span>
                <p>N5000</p>
              </MinAmount> */}

              <span className="label">Quick Pay</span>
              <AmountToFundWallet>
                {[5000, 10000, 20000, 25000]?.map(
                  (amount: number, i: number) => (
                    <ButtonStyle
                      key={i}
                      style={{
                        background: index === i ? "#FF2A5F" : "transparent",
                      }}
                      onClick={() => {
                        setAmount(amount);
                        setIndex(i);
                        setShowModal(true);
                      }}
                    >
                      {amount}
                    </ButtonStyle>
                  )
                )}
              </AmountToFundWallet>
              <p style={{ color: "white" }}>
                Paystack charges{" "}
                {formatPrice(paystackCharge(amount ? amount : amountCharges))}
              </p>
              <br />
              <span className="label">Large Amount</span>
              <CustomInput
                placeholder="Enter Amount"
                type="number"
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) => setAmount(parseInt(value))}
                inputStyle={{ color: "white" }}
              />
              <br />
              <ButtonStyle
                disabled={!amount}
                style={{ padding: 10 }}
                onClick={() => {
                  setAmount(amount);
                  setShowModal(true);
                }}
              >
                {amount ? formatPrice(amount) : "Fund Wallet"}
              </ButtonStyle>
            </MakePayment>
          );
        }}
        closable
        handleCancel={() => setShowFundWalletModal(false)}
        width={400}
      />

      <CustomModalUI
        component={() => (
          <PayStackChargeModalDiv>
            <h1>Paystack Charge</h1>
            <p>Pay stack charges you {formatPrice(paystackCharge(amount))}</p>
            <div className="action_btns">
              <ButtonStyle
                style={{ padding: 2 }}
                disabled={!amount}
                onClick={() => {
                  setAmount(0);
                  setShowModal(false);
                }}
              >
                Cancel
              </ButtonStyle>
              {false ? (
                <div
                  style={{
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Loader size={0} type="Oval" width={18} height={18} />
                </div>
              ) : (
                <PayStack
                  background={"#FF2A5F"}
                  style={{ height: 27, border: 0 }}
                  amount={amount ? paystackCharge(amount) + amount : 0}
                  charges={paystackCharge(amount)}
                  email={"test@example.com"}
                  handleClose={() => {}}
                  setStateAmount={setStateAmount}
                  saveTransaction={confirm}
                  description={`Fund wallet with ${amount}`}
                  creator_id={0}
                  label={"Pay"}
                  showNumber={false}
                  route="/wallet"
                />
              )}
            </div>
          </PayStackChargeModalDiv>
        )}
        visible={showModal}
        handleCancel={() => {}}
        width={300}
        closable={false}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 70%;

  @media (max-width: 769px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const ButtonStyle = styled.button`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  background-color: transparent;
  margin-right: 10px;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const ParagraphOne = styled.h1`
  color: rgba(255, 255, 255, 0.7);
  margin: 20px 0;
`;

// const MinAmount = styled.div`
//   color: rgba(255, 255, 255, 0.7);
//   margin: 40px 0;

//   p {
//     font-weight: bolder;
//   }
// `;

const AmountToFundWallet = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  div {
    margin-right: 10px;
    padding: 5px 30px;
    border: 1px solid #999999;
    border-radius: 20px;
    color: red;
    cursor: pointer;
  }
`;

const MakePayment = styled.div`
  background: #3b3b4d;
  padding: 20px;

  .label {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 5px;
  }
`;

const PayStackChargeModalDiv = styled.div`
  background-color: #121217;
  padding: 30px;

  h1,
  p {
    color: #dddddd;
    margin-bottom: 30px;
  }
  .action_btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export default PaymentComponent;
