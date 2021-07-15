import React, { useState, CSSProperties } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { DDWrapper, DDHeader, DDList, DDIcon, ErrorMessage } from "./style";

export type DType = {
  id: number | string;
  label: string;
  value: string;
};

type Props = {
  data: DType[];
  defaultSelect?: string;
  name?: string;
  error?: string;
  onChange?: any;
  style?: CSSProperties;
  disabled?: boolean;
};

const CustomDropdown: React.FC<Props> = ({
  defaultSelect,
  data,
  name,
  error,
  onChange,
  style,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const showOrHideClassname = visible ? "show" : "hide";
  return (
    <DDWrapper style={style}>
      <DDHeader
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setVisible(!visible);
          }
        }}
      >
        <div className="dd-header-title">
          {value ? (
            <span className="value">{value}</span>
          ) : (
            <span className="defaultSelect">{defaultSelect}</span>
          )}
        </div>
        {visible ? (
          <DDIcon>
            <UpOutlined className="arrow-down" />
          </DDIcon>
        ) : (
          <DDIcon>
            <DownOutlined className="arrow-down" />
          </DDIcon>
        )}
      </DDHeader>
      <DDList className={showOrHideClassname}>
        {data?.map((list: DType) => (
          <div
            key={list.id}
            className="dd-list-item"
            onClick={() => {
              setValue(list.label);
              setVisible(false);
              if (onChange) {
                onChange({
                  target: {
                    id: list.id,
                    value: list.value,
                    label: list.label,
                    name: name ? name : null,
                  },
                });
              }
            }}
          >
            {list.label}
          </div>
        ))}
      </DDList>
      <ErrorMessage>{error}</ErrorMessage>
    </DDWrapper>
  );
};

export default CustomDropdown;
