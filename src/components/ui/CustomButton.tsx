import React, { CSSProperties, FC } from "react";
import styled from "styled-components";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  background?: string;
  label: string;
  onClick?: (e: React.FormEvent) => void;
  style?: CSSProperties;
  width?: string;
  testId?: string;
  disabled?: boolean;
  loading?: boolean;
};

const defaultStyle: CSSProperties = {
  cursor: "pointer",
};

const CustomButton: FC<Props> = ({
  label,
  background,
  onClick,
  type = "button",
  style = defaultStyle,
  width,
  testId,
  disabled,
  loading = false,
}) => {
  return (
    <ButtonDiv style={{ ...style }} onClick={onClick}>
      <Button
        style={{ cursor: loading ? "not-allow" : "pointer" }}
        data-testid={testId}
        width={width}
        background={background}
        type={type}
        disabled={disabled}
      >
        {loading ? <span style={{ color: "#121217" }}>Loading...</span> : label}
      </Button>
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  width: 100%;
`;

const Button = styled.button<{ background?: string; width?: string }>`
  background: ${({ background }) => (background ? background : "white")};
  outline: none;
  border: none;
  padding: 10px;
  width: ${({ width }) => (width ? width : "100%")};
  border-radius: 4px;
  color: ${({ background }) => (background ? "white" : "")};
`;

export default CustomButton;
