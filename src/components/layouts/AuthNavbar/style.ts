import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavbarMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  border-bottom: 1px solid #eeeeee;
`;
export const MenuName = styled.h3`
  margin: 0;
  color: #121217;
  padding: 20px 0;

  .blue {
    color: blue;
  }
  .red {
    color: orangered;
  }
  .yellow {
    color: orchid;
  }
`;
export const Menus = styled.div`
  display: flex;
  align-items: center;
`;
export const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: #121217;
  transition: 0.5s;

  &:hover {
    color: orange;
  }

  &:nth-child(1) {
    margin-right: 20px;
  }

  .selected {
    color: orange;
  }
`;

export const InitialCharacter = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: violet;
  text-align: center;
  line-height: 30px;
  position: relative;
`;
