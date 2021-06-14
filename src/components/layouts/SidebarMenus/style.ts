import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Menus = styled.div`
  display: flex;
  flex-direction: column;
`;
export const MenuName = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  font-size: 25px;
  padding-left: 15%;

  span {
    cursor: pointer;
  }

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
export const MenuLists = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;

  .selected {
    background-color: #f1f1f7;
    text-decoration: none;
  }
`;
export const MenuList = styled(NavLink)<{isCollapse?: boolean}>`
  padding: 15px 0;
  padding-left: ${({isCollapse}) => isCollapse ? "30%" : "15%"};
  text-decoration: none;
  color: #555555;

  span {
    margin-left: 20px;
  }
`;
