import { ErrorLabel } from "components/Auth/common/style";
import React, { CSSProperties, useState } from "react";
import styled from "styled-components";

type Props = {
  type?: string;
  name?: string;
  value?: string;
  error?: string | any;
  placeholder: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  noLabel?: boolean | undefined;
  showIcon?: boolean | undefined;
  isShowPassword?: boolean;
  disabled?: boolean;
  required?: boolean;
};

const InputWithLabel: React.FC<Props> = ({
  type = "text",
  placeholder,
  label,
  error,
  value = "",
  name,
  onChange,
  onBlur,
  style,
  inputStyle,
  noLabel,
  showIcon,
  disabled,
  required,
  isShowPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputDiv style={style}>
      {noLabel ? null : (
        <Label htmlFor={name}>
          {label} {required ? "*" : ""}
        </Label>
      )}
      <div className="input" style={inputStyle}>
        {showIcon && <i className="fas fa-search"></i>}
        <Input
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          data-testid="input"
          disabled={disabled}
        />
        {isShowPassword ? (
          !showPassword ? (
            <i
              className="fas fa-eye eye"
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          ) : (
            <i
              className="fas fa-eye-slash eye"
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          )
        ) : null}
      </div>
      <ErrorLabel htmlFor="input">{error}</ErrorLabel>
    </InputDiv>
  );
};

const InputDiv = styled.div`
  overflow: hidden;
  border-radius: 4px;
  
  .input {
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    padding: 0 10px;

    .fa-search {
      color: #aaaaaa;
      margin-right: 10px;
    }

    .eye {
      color: #777777;
      cursor: pointer;
    }
  }
`;
const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 5px;
`;
const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 10px 0;
`;

export default InputWithLabel;
