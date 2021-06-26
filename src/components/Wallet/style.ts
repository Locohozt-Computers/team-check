import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 2%;
  overflow-y: auto;
  background-color: #f1f1f7;

  .hi {
    color: #454e6a;
    margin-bottom: 40px;
  }

  .name {
    color: #454e6a;
  }

  .fund_btn {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    height: 86vh;
  }
`;

export const WalletCardStyle = styled.div`
  height: 200px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  h1 {
    margin: 0;
    color: #454e6a;
    font-size: 35px;
  }
`;

export const TransactionStyle = styled.div`
  padding-top: 20px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  padding: 16px;

  h1 {
    color: #454e6a;
    margin-bottom: 20px;
  }
`;

export const TransactionListStyle = styled.div`
  display: grid;
  grid-template-columns: 50px 100px repeat(auto-fit, minmax(10px, 1fr));
  padding: 10px 0;

  .transaction_type {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    background-color: green;
    color: white;
    line-height: 25px;
    text-align: center;
  }

  .transaction_amount {
    color: #5e667f;
  }

  .transaction_description {
    color: #3F4868;
  }

  .transaction_date {
    color: #3F4868;
  }
`;
