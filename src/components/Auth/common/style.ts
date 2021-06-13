import styled from "styled-components";

export const ErrorLabel = styled.label<{ textAlign?: string }>`
  display: block;
  color: red;
  font-size: 12px;
  margin-top: 5px;
  text-align: ${({ textAlign }) => textAlign && textAlign};
`;
