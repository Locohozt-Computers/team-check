import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0%: {
    transform: translate(0%);
  }
  100%: {
    transform: translate(100%);
  }
`;

export const Dashboard = styled.div``;

export const Sidebar = styled.div`
  background-color: white;
  transition: all 1s linear;
  animation: ${animate} 0.9s linear;
`;

export const Content = styled.div<{ isCollapse?: boolean; isMobile?: boolean }>`
  height: calc(100vh - 50px);
  background-color: #f1f1f7;
  display: grid;
  grid-template-columns: ${({ isCollapse, isMobile }) =>
    isCollapse || isMobile ? "50px auto" : "250px auto"};
  overflow-y: hidden;

  @media (width: 600px) {
    grid-template-columns: 50px auto;
  }
`;

export const InnerContent = styled.div`
  padding: 20px;
  height: calc(100vh - 50px);
  max-width: 1200px;
  width: 100%;
  background: ${({ theme }) => theme && theme.primary.background2};
  margin: auto;
`;
