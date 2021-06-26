import React from "react";
import { Modal } from "antd";
import styled from "styled-components";

type TProps = {
  visible: any;
  component?: any;
  handleOk?: any;
  handleCancel?: any;
  width?: number | string;
  style?: any;
  closable?: any;
};

const CustomModalUI = (props: TProps) => {
  return (
    <ModalStyle
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={props.width}
      style={props.style}
      footer={null}
      closable={props.closable}
      centered
    >
      {props.component()}
    </ModalStyle>
  );
};

const ModalStyle = styled(Modal)`
  div.ant-modal-content {
    border-radius: 10px !important;
    background: transparent;
    /* background: #121217; */
  }
  .ant-modal-body {
    overflow: hidden !important;
    padding: 0;
    border-radius: 10px !important;
  }

  .ant-modal-close-x {
    border: 1px solid white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    span {
      svg {
        color: white;
        font-size: 18px;
        width: 18px;
      }
    }
  }
`;

export default CustomModalUI;
