import { ErrorLabel } from "components/Auth/common/style";
import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  type?: string;
  name?: string;
  value?: string;
  error?: string;
  placeholder: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
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
}) => {
  return (
    <div style={style}>
      <Label htmlFor={name}>{label} *</Label>
      <Input
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        data-testid="input"
      />
      <ErrorLabel htmlFor="input">{error}</ErrorLabel>
    </div>
  );
};

const Label = styled.label`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 5px;
`;
const Input = styled.input`
  outline: none;
  border: 1px solid #dddddd;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
`;

export default InputWithLabel;
