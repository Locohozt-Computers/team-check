import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 2% 10px;
  background: #f1f1f7;
`;
export const Form = styled.form`
  max-width: 500px;
  width: 100%;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
`;
// export const Container = styled.div``
// export const Container = styled.div``
// export const Container = styled.div``
