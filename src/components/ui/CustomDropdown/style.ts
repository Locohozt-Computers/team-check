import styled from "styled-components";

export const DDWrapper = styled.div`
  position: relative;
`;

export const DDHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ebeaeb;
  border-radius: 4px;
  background-color: white;
  color: #161616;
  cursor: pointer;

  .defaultSelect {
    color: #a0b9ca;
  }

  .dd-header-title {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    font-feature-settings: "ss04" on;
    color: #161616;
  }
`;

export const DDIcon = styled.div`
  width: 20px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DDList = styled.div`
  min-height: 0%;
  border: 1px solid #ebeaeb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
  position: absolute;
  top: 58px;
  width: 100%;
  background-color: white;
  z-index: 20;
  max-height: 400px;
  min-height: 100px;
  overflow-y: auto;
  z-index: 10;

  .dd-list-item {
    padding: 5px;
    background-color: white;
    cursor: pointer;
    color: #444444;

    &:hover {
      background-color: "#F3F4FF";
    }
  }

  &.show {
    opacity: 1;
    pointer-events: visible;
    height: 100%;
  }
  &.hide {
    opacity: 0;
    pointer-events: none;
    height: 0px;
  }
`;
