import styled from "styled-components";

export const Container = styled.div`
  max-height: 100vh;
  height: 100%;
  width: 100%;
`;
export const Content = styled.div`
  border: 0.5px solid ${({ theme }) => theme.primary.border100};
  border-radius: 8px;
  display: flex;
  padding: 5px 10px;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  background: ${({ theme }) => theme.primary.background};
`;

export const SearchStyle = styled.div`
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: -125px;
  padding: 0 15px;
`;

export const SearchButton = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
  margin-left: 10px;
  cursor: pointer;

  i {
    font-size: 16px;
    color: ${({ theme }) => theme.primary.text2};
  }
`;

export const PhonesAdvertStyle = styled.div`
  width: 100%;
  border-left: 1px solid #cccccc;
  height: 100%;
  padding: 15px;
  margin-top: 50px;
`;

export const LandingStyle = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
  background: ${({ theme }) => theme.primary.blue};
  display: flex;
  justify-content: center;
  align-items: center;

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
