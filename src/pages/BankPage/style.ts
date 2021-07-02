import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  background-color: white;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
