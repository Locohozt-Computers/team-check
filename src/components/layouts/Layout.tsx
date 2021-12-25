import React from "react";
import styled from "styled-components";

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutStyle>
      <Navbar>
        <p>Logo</p>
        <p>Avatar</p>
      </Navbar>
      <Body>
        <SideBar></SideBar>
        <Main>{children}</Main>
      </Body>
    </LayoutStyle>
  );
};

export const LayoutStyle = styled.div``;
export const Navbar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;
export const Body = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  height: calc(100vh - 50px);
`;
export const SideBar = styled.div`
  background: linen;
`;
export const Main = styled.div`
  background: lightgray;
`;

export default Layout;
