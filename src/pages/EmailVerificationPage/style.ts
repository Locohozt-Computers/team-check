import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f1f1f7;
  padding: 10px;
`;
export const Card = styled.div`
  max-width: 500px;
  width: 100%;
  min-height: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 40px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;
