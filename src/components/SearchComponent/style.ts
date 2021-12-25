import styled from "styled-components";

export const Container = styled.div`
  max-height: 100vh;
  height: 100%;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 0 10px;
  background: ${({theme}) => theme.primary.background};

  @media(max-width: 766px) {
      height: 250px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 40px;
    .blue {
      color: blue;
    }
    .red {
      color: orangered;
    }
    .yellow {
      color: orchid;
    }
  }
`;
export const PhonesAdvertStyle = styled.div`
  border-left: 1px solid #cccccc;
  height: 100%;
  padding: 15px;
`;
