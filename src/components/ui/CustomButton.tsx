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
  className?: string;
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
  className,
}) => {
  return (
    <ButtonDiv
      background={background}
      style={{ ...style }}
      onClick={onClick}
      className={className}
    >
      <Button
        style={{ cursor: loading ? "not-allow" : "pointer" }}
        data-testid={testId}
        width={width}
        type={type}
        disabled={disabled}
      >
        {loading ? <span style={{ color: "#121217" }}>Loading...</span> : label}
      </Button>
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div<{ background?: string; width?: string }>`
  width: 100%;
  padding: 10px 10px;
  background: ${({ background }) => (background ? background : "white")};
  border-radius: 4px;
  color: ${({ background }) => (background ? "white" : "")};
`;

const Button = styled.button<{ background?: string; width?: string }>`
  outline: none;
  border: none;
  width: ${({ width }) => (width ? width : "100%")};
  background-color: transparent;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    padding: 10px 0;
  }
`;

export default CustomButton;
