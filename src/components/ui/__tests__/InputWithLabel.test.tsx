import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputWithLabel from "../InputWithLabel";
import { act } from "react-dom/test-utils";
import AuthButton from "../AuthButton";

describe("Auth Button", () => {
  test("Render Button", async () => {
    const onChange = jest.fn(() => {});

    const { container, getByText } = render(
      <InputWithLabel
        label="Email Address"
        placeholder="Enter Email Address"
        onChange={onChange}
      />
    );
    expect(container).toBeInTheDocument();
    expect(getByText("Email Address *")).toBeTruthy();
  });

  test("Render Button", async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    
    render(<AuthButton label="Submit" onClick={onClick} />)

    const value = "Hello World";
    const noValue = "Hello World 1";

    const event = {
      preventDefault() {},
      target: { value: "Hello World" },
    };

    const {
      container,
      getByPlaceholderText,
      getByText,
      getByDisplayValue,
    } = render(
      <InputWithLabel
        label="Email Address"
        placeholder="Enter Email Address"
        onChange={onChange}
        value={value}
      />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText("Enter Email Address"), event);
    });

    await act(async () => {
      fireEvent.click(getByText("Submit"));
    });

    expect(container).toBeInTheDocument();
    expect(getByDisplayValue(value)).toBeDefined();
    expect(screen.getByDisplayValue(value)).toBeDefined();
    expect(onClick).toHaveBeenCalled()
  });
});
