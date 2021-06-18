import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 2%;
  overflow-y: auto;
  background-color: white;

  h1 {
      margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    height: 86vh;
  }
`;
