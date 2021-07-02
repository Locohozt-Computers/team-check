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
  transition: all 0.5s ease-in-out;
  position: absolute;
  top: 38px;
  width: 100%;
  background-color: white;
  z-index: 20;
  max-height: 400px;
  min-height: 400px;
  overflow-y: auto;

  .dd-list-item {
    padding: 5px;
    background-color: white;
    cursor: pointer;

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
