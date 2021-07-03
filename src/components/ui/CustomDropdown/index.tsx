import React, { useState, CSSProperties } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { DDWrapper, DDHeader, DDList, DDIcon } from "./style";

export type DType = {
  id: number;
  label: string;
  value: string;
};

type Props = {
  data: DType[];
  defaultSelect?: string;
  onChange?: any;
  style?: CSSProperties;
};

const CustomDropdown: React.FC<Props> = ({
  defaultSelect,
  data,
  onChange,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");

  const showOrHideClassname = visible ? "show" : "hide";
  return (
    <DDWrapper style={style}>
      <DDHeader onClick={() => setVisible(!visible)}>
        <div className="dd-header-title">
          {!value && "*"}
          {value ? value : defaultSelect}
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
                    value: list.value,
                    name: list.label,
                  },
                });
              }
            }}
          >
            {list.label}
          </div>
        ))}
      </DDList>
    </DDWrapper>
  );
};

export default CustomDropdown;
