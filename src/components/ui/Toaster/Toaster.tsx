import React, { forwardRef, useImperativeHandle, useState, Ref } from "react";
import styled from "styled-components";

export type RefType = {
    show: () => void;
  };

type Props = {
  message: string;
  type?: "success" | "error";
  timeout?: number;
  position?: "left" | "center" | "right";
  ref: Ref<RefType>;
};

const Toaster: React.FC<Props> = forwardRef(
  ({ message, type = "success", timeout, position = "center" }, ref) => {
    const [toast, setToast] = useState(false);

    useImperativeHandle(ref, () => ({
      show() {
        setToast(true);
        if (timeout) {
          setTimeout(() => setToast(false), timeout);
        }
      },
    }));

    const getClassName = () => {
      switch (type) {
        case "success":
          return "btn success";
        case "error":
          return "btn error";
        default:
          return "btn success";
      }
    };

    return (
      <ToasterContainer
        id={toast ? "show" : "hide"}
        className={getClassName()}
        position={position}
      >
        {type === "success" ? <span>&#x2713;</span> : <span>&#x2720;</span>}
        <span>{message}</span>
      </ToasterContainer>
    );
  }
);

export const ToasterContainer = styled.div<{ position?: string }>`
  position: fixed;
  top: 20px;
  ${({ position }) =>
    (position === "center" || position === "left") &&
    `
    left: ${position === "center" ? "50%" : position === "left" ? "20px" : "0"};
  `}
  ${({ position }) =>
    position === "right" &&
    `
    right: 20px;
  `}
  transform: translate(
    ${({ position }) =>
    position === "center" ? "-50%" : position === "left" ? "0" : "0%"},
    -10px
  );
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);

  &#show {
    visibility: visible;
  }

  &#hide {
    visibility: hidden;
  }

  &.btn {
    max-width: 400px;
    min-width: 200px;
    width: 100%;
    color: white;
    min-height: 60px;
    white-space: wrap;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    span:first-child {
      width: 30px;
      height: 30px;
      border: 2px solid #cccccc;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-right: 20px;
    }
  }

  &.success {
    background-color: green;
    border-left: 8px solid dodgerblue;
  }

  &.error {
    background-color: orangered;
    border-left: 8px solid dodgerblue;
  }
`;

export default Toaster;
