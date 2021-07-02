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

export const Form = styled.form`
  max-width: 500px;
  width: 100%;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 40px;

  h1 {
    text-align: center;
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
