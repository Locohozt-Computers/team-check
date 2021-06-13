import styled from "styled-components";

export const Dashboard = styled.div<{ isCollapse?: boolean }>`
  height: 100vh;
  background-color: #f1f1f7;
  display: grid;
  grid-template-columns: ${({ isCollapse }) =>
    isCollapse ? "7% 93%" : "25% 75%"};
`;

export const Sidebar = styled.div`
  background-color: white;
`;

export const Content = styled.div`
  /* background-color: blue; */
`;
