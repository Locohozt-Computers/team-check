import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 16px;
  overflow-y: auto;
  background-color: white;

  h1 {
    margin-bottom: 5px;
    color: #c5c7e2;
  }

  h2 {
    color: #3f4868;
  }

  @media (max-width: 768px) {
    height: 86vh;
  }
`;

export const Detail = styled.div`
  max-width: 500px;
  width: 100%;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  padding: 40px;

  h1 {
    margin-bottom: 30px;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .forgot-password {
      text-align: end;
      font-size: 14px;
      margin-top: 10px;

      span {
        color: #177bff;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 15px;
  }
`;
