import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: white;
  padding: 0 15px;
  padding-left: 0;

  @media (max-width: 768px) {
    padding: 0 0;
  }

  .menu {
    display: flex;
    align-items: center;
    height: 100%;

    .btn-secondary {
      background-color: transparent;
      border: 0;
      outline: none;

      &:hover {
        outline: none;
        border: 0;
      }
    }

    p {
      margin: 0;
    }

    p:last-child {
      margin-left: 15px;
      cursor: pointer;
    }
  }
`;

export const MenuName = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding-left: 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`;

export const Flex = styled.div<{ isCollapse?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ isCollapse }) => (isCollapse ? "110px" : "calc(250px + 40px)")};
`;
