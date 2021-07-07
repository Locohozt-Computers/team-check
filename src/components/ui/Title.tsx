import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <H1>{title}</H1>
    </div>
  );
};

const H1 = styled.div`
  margin: 0;
  color: #c5c7e2;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export default Title;
