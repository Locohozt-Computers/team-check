import styled from "styled-components";

export const Dashboard = styled.div<{ isCollapse?: boolean }>`
  height: 100vh;
  background-color: #f1f1f7;
  display: grid;
  grid-template-columns: ${({ isCollapse }) =>
    isCollapse ? "50px auto" : "200px auto"};
  overflow-y: hidden;

  @media(width: 600px) {
    grid-template-columns: 50px auto;
  }
`;

export const Sidebar = styled.div`
  background-color: white;
`;

export const Content = styled.div`
  /* background-color: blue; */
`;

export const InnerContent = styled.div`
  padding: 2% 4%;
`;
