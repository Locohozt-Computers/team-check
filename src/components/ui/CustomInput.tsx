import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  type?: string;
  name?: string;
  value?: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  showIcon?: boolean | undefined;
};

const CustomInput: React.FC<Props> = ({
  type = "text",
  placeholder,
  value = "",
  name,
  onChange,
  onBlur,
  style,
  inputStyle,
  showIcon,
}) => {
  return (
    <InputDiv style={style}>
      {showIcon && <i className="fas fa-search"></i>}
      <Input
        style={inputStyle}
        type={type}
        id={name}
        value={value ?? ""}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        data-testid="input"
      />
    </InputDiv>
  );
};

const InputDiv = styled.div`
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  padding: 10px;

  .fa-search {
    color: #aaaaaa;
    margin-right: 10px;
  }
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  background-color: transparent;
`;

export default CustomInput;
