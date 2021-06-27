import styled from "styled-components";

export const DropdownContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 13;
  border: 1px solid #eeeeee;

  p {
    margin: 0;
    padding: 10px;
    width: 100%;
    text-align: left;
    color: #5e667f;
    cursor: pointer;

    :hover {
      background-color: #f1f1f7;
    }
  }
`;
