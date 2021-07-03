import React from "react";
import { GetEdBankType, UserType } from "types/authTypes";
import { Container, Detail } from "./style";

const BankDisplay: React.FC<{
  profile: (UserType & { bank: GetEdBankType }) | null;
}> = ({ profile }) => {
  const bank = profile?.bank;

  const getDate = (date: any) => {
    return date ? new Date(date).toDateString() : "";
  };

  return (
    <Container>
      <Detail>
        <h1>Bank Details</h1>

        <h2>Bank Name: {bank?.bank_name}</h2>
        <p>Account Name: {bank?.account_name}</p>
        <p>Account Number: {bank?.account_number}</p>
        <p>Account created {getDate(bank?.created_at)}</p>
        <p>Account updated {getDate(bank?.updated_at)}</p>
      </Detail>
    </Container>
  );
};

export default BankDisplay;
