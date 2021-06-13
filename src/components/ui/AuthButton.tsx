import React, { CSSProperties, FC } from "react";
import styled from "styled-components";

import google from 'assets/icons/google.svg';

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  background?: string;
  label: string;
  onClick: (e: any) => void;
  style?: CSSProperties;
  width?: string;
  iconName?: string;
};

const AuthButton: FC<Props> = ({
  label,
  background,
  onClick,
  type = "button",
  style,
  width,
  iconName = "google",
}) => {
  return (
    <div style={style}>
      <Button
        onClick={onClick}
        width={width}
        background={background}
        type={type}
      >
        <img src={google} alt="google icon" width="20px" /> <span>{label}</span>
      </Button>
    </div>
  );
};

const Button = styled.button<{ background?: string; width?: string }>`
  background: ${({ background }) => (background ? background : "white")};
  outline: none;
  border: none;
  padding: 10px;
  width: ${({ width }) => (width ? width : "100%")};
  border-radius: 4px;
  color: ${({ background }) => (background ? "white" : "")};
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
      margin-right: 10px;
  }

  span {
      font-size: 18px;
      color: #444444;
  }
`;

export default AuthButton;
