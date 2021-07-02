import { Select } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";

const { Option } = Select;

type SType = {
  options: any;
  onChange?: any;
  defaultValue?: any;
  style?: any;
  label?: string;
};

const CustomSelect = (props: SType) => {
  const isLabel = Boolean(props.label);
  return (
    <SelectDiv style={props.style}>
      {isLabel && <label htmlFor="">{props.label}</label>}
      {/* <SelectStyle 
        options={props.options} 
        onChange={props.onChange} 
        defaultValue={props.defaultValue} 
        className='select' 
        suffixIcon={<div style={{color: 'white', transform: 'rotate(-90deg)'}}>{arrow}</div>}
      /> */}
      <SelectStyle
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        className="select"
      >
        {props?.options?.map((option: any) => (
          <Option key={option.key} value={option?.value}>
            {option.label}
          </Option>
        ))}
      </SelectStyle>
    </SelectDiv>
  );
};

const SelectDiv = styled.div`
  width: 100%;
  background-color: transparent;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 8px;
`;
const SelectStyle = styled(Select)<{ theme?: string }>`
  width: 100%;

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
    color: #121217;
    width: 100%;
    border: none;
    outline: none;
    padding: 10px;
    padding: 0;

    span .ant-select-arrow .anticon-down {
      color: white;
    }
  }
`;

export default CustomSelect;
