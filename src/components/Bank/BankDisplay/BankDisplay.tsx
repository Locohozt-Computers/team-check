import { WalletContext } from "context/wallet/WalletProvider";
import React, { useContext } from "react";
import { GetEdBankType, UserType } from "types/authTypes";
import { Container, Detail } from "./style";

const BankDisplay: React.FC<{
  profile: (UserType & { bank: GetEdBankType }) | null;
}> = ({ profile }) => {
  const bank = profile?.bank;
  const { bankDetails } = useContext(WalletContext);

  const getDate = (date: any) => {
    return date ? new Date(date).toDateString() : "";
  };

  return (
    <Container>
      <Detail>
        <h1>Bank Details</h1>

        {bankDetails ? (
          <>
            <h2>
              Bank Name:{" "}
              {bankDetails?.bank_name
                ? bankDetails?.bank_name
                : bank?.bank_name}
            </h2>
            <p>
              Account Name:{" "}
              {bankDetails?.account_name
                ? bankDetails?.account_name
                : bank?.account_name}
            </p>
            <p>
              Account Number:{" "}
              {bankDetails?.account_number
                ? bankDetails?.account_number
                : bank?.account_number}
            </p>
            <p>
              Account created{" "}
              {getDate(
                bankDetails?.created_at
                  ? bankDetails?.created_at
                  : bank?.created_at
              )}
            </p>
            <p>
              Account updated{" "}
              {getDate(
                bankDetails?.updated_at
                  ? bankDetails?.updated_at
                  : bank?.updated_at
              )}
            </p>
          </>
        ) : (
          <p>No data to display, please add a bank</p>
        )}
      </Detail>
    </Container>
  );
};

export default BankDisplay;
