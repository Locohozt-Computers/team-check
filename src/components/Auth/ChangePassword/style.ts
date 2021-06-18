import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;
export const Form = styled.form`
  max-width: 500px;
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 20px;

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
