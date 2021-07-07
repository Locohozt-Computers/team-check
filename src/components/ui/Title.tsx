import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  return <H1>{title}</H1>;
};

const H1 = styled.div`
  margin: 0;
  color: #c5c7e2;
  font-size: 35px;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export default Title;
