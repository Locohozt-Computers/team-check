import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 2%;
  overflow-y: auto;
  background-color: white;

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
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    height: 86vh;
  }
`;

export const WalletCardStyle = styled.div`
  height: 200px;
  background-color: coral;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  h1 {
    margin: 0;
    color: white;
    font-size: 35px;
  }
`;
