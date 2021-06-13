import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Menus = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
`;
export const MenuName = styled.div`
  margin-bottom: 20%;
  font-size: 25px;
  padding-left: 15%;
`;
export const MenuLists = styled.div`
  display: flex;
  flex-direction: column;

  .selected {
    background-color: #f1f1f7;
    text-decoration: none;
  }
`;
export const MenuList = styled(NavLink)`
  padding: 15px 0;
  padding-left: 15%;
  text-decoration: none;
  color: #121217;
`;
