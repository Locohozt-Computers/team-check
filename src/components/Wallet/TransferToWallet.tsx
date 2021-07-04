import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styled from "styled-components";

import CustomModalUI from "components/ui/CustomModal";
import Loader from "components/ui/Loader";
import { formatPrice } from "utils/formatPrice";
import CustomInput from "components/ui/CustomInput";
import CustomButton from "components/ui/CustomButton";
import { WalletContext } from "context/wallet/WalletProvider";
import { AuthContext } from "context/auth/AuthProvider";
import { successNotify } from "utils/errorMessage";

type Props = {
  setShowTransferToWallet: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  showTransferToWallet: boolean;
};

const TransferToWallet: React.FC<Props> = ({
  setShowTransferToWallet,
  showTransferToWallet,
  setAmount: setStateAmount,
  amount: stateAmount,
}) => {
  const { walletTransferToWallet, removeFromWalletBalance } =
    useContext(WalletContext);
  const { profile } = useContext(AuthContext);

  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  // console.log("")

  async function confirm() {
    setLoading(true);
    const obj = {
      email,
      amount,
    };
    try {
      await walletTransferToWallet(obj);
      successNotify("Your wallet transfer was successful");
      setStateAmount(amount ? (profile?.walletBalance ?? 0) - amount : 0);
      removeFromWalletBalance(amount);
      setLoading(false);
      setShowTransferToWallet(false);
      setShowModal(false);
    } catch (error) {}
  }

  return (
    <Container>
      <CustomModalUI
        visible={showTransferToWallet}
        component={() => {
          return (
            <MakePayment>
              <ParagraphOne>Transfer To Wallet</ParagraphOne>

              <span className="label">Enter Email</span>
              <CustomInput
                placeholder="Enter Email"
                type="text"
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) => setEmail(value)}
                inputStyle={{ color: "white" }}
                style={{ marginBottom: 20 }}
              />

              <span className="label">Quick Transfer</span>
              <AmountToFundWallet>
                {[5000, 10000, 20000, 25000]?.map(
                  (amount: number, i: number) => (
                    <ButtonStyle
                      key={i}
                      // disabled={!email}
                      style={{
                        background: index === i ? "#FF2A5F" : "transparent",
                      }}
                      onClick={async () => {
                        if (!email) {
                          setAlertModal(true);
                          return;
                        }
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
                // disabled={!amount}
                style={{ padding: 10 }}
                onClick={() => {
                  if (!email) {
                    setAlertModal(true);
                    return;
                  }
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
        handleCancel={() => setShowTransferToWallet(false)}
        width={400}
      />

      <CustomModalUI
        component={() => (
          <AlertModal>
            <h1>Wallet Transfer</h1>
            <p>You are abount to transfer to a wallet</p>
            <div className="action_btns">
              <CustomButton
                label="Cancel"
                style={{ padding: "5px", marginRight: 10 }}
                onClick={() => {
                  setAmount(0);
                  setShowModal(false);
                }}
              />
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
                <CustomButton
                  label={loading ? "loading..." : "Ok"}
                  style={{ padding: "5px" }}
                  background="orangered"
                  onClick={confirm}
                />
              )}
            </div>
          </AlertModal>
        )}
        visible={showModal}
        handleCancel={() => {}}
        width={300}
        closable={false}
      />
      <CustomModalUI
        component={() => (
          <AlertModal>
            <h1>Error Message</h1>
            <p>
              Please type in the email or amount you want to transfer money to
            </p>
            <CustomButton
              label="Cancel"
              style={{ padding: "5px", marginRight: 10 }}
              onClick={() => {
                setAlertModal(false);
              }}
            />
          </AlertModal>
        )}
        visible={alertModal}
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

const AlertModal = styled.div`
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

export default TransferToWallet;
