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
  font-size: 20px;
  padding-left: 10%;

  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .username {
    font-size: 14px;
    margin: 0;
    margin-left: 10px;
  }

  span {
    cursor: pointer;
  }

  .blue {
    color: #177bff;
  }
  .red {
    color: orangered;
  }
  .yellow {
    color: orchid;
  }
`;
export const MenuLists = styled.div<{ isCollapse?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  padding-left: ${({ isCollapse }) => (isCollapse ? "5px" : "15px")};

  .selected {
    background-color: #f1f1f7;
    text-decoration: none;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;
export const MenuList = styled(NavLink)<{ isCollapse?: boolean }>`
  padding: 15px 0;
  padding-left: ${({ isCollapse }) => (isCollapse ? "30%" : "15%")};
  text-decoration: none;
  color: #555555;

  span {
    margin-left: 20px;
  }
`;
