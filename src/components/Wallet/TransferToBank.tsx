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
import CustomButton from "components/ui/CustomButton";
import { WalletContext } from "context/wallet/WalletProvider";

type Props = {
  setShowTransferToBank: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  amount: number;
  showTransferToBank: boolean;
};

const TransferToBank: React.FC<Props> = ({
  setShowTransferToBank,
  showTransferToBank,
  setAmount: setStateAmount,
  amount: stateAmount,
}) => {
  const { walletTransferToBank, removeFromWalletBalance } =
    useContext(WalletContext);

  const [amount, setAmount] = useState<number>(0);
  const [index, setIndex] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function confirm() {
    setLoading(true);
    try {
      await walletTransferToBank(amount);
      setAmount(0);
      setIndex(-1);
      removeFromWalletBalance(amount);
      setLoading(false);
      setShowTransferToBank(false);
      setShowModal(false);
    } catch (error) {}
  }

  return (
    <Container>
      <CustomModalUI
        visible={showTransferToBank}
        component={() => {
          return (
            <MakePayment>
              <ParagraphOne>Transfer To Bank</ParagraphOne>

              <span className="label">Quick Transfer</span>
              <AmountToFundWallet>
                {[5000, 10000, 20000, 25000]?.map(
                  (amount: number, i: number) => (
                    <ButtonStyle
                      key={i}
                      style={{
                        background: index === i ? "#FF2A5F" : "transparent",
                      }}
                      onClick={async () => {
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
              {/* <p style={{ color: "white" }}>
                Paystack charges{" "}
                {formatPrice(paystackCharge(amount ? amount : amountCharges))}
              </p> */}
              <br />
              <span className="label">Large Amount</span>
              <InputDiv>
                <Input
                  placeholder="Enter Amount"
                  type="number"
                  value={amount}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) =>
                    setAmount(parseInt(value))
                  }
                />
              </InputDiv>
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
        handleCancel={() => setShowTransferToBank(false)}
        width={400}
      />

      <CustomModalUI
        component={() => (
          <AlertModal>
            <h1>Bank Transfer</h1>
            <p>Are you sure you want to transfer to your bank</p>
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

const InputDiv = styled.div`
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  padding: 10px;

  .fa-search {
    color: #aaaaaa;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
  color: white;
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

export default TransferToBank;
