import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 84vh;
  padding: 2%;
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
