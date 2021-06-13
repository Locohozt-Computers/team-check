import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AuthButton from "../AuthButton";

describe("Auth Button", () => {
  test("Render Button", async () => {
    const onClick = jest.fn();

    render(
      <AuthButton label="label" onClick={onClick} />
    );
    expect(screen.getByText("label")).toBeTruthy();
    expect(screen.getByText("label")).toBeDefined();
  });

  test("Image should be rendered", async () => {
    const onClick = jest.fn();

    render(
      <AuthButton label="label" onClick={onClick} />
    );

    expect(screen.getByAltText("google icon")).toBeTruthy();
  });

  test("", async () => {
    const onClick = jest.fn();

    render(
      <AuthButton label="label" onClick={onClick} />
    );
    
    fireEvent.click(screen.getByAltText("google icon"));

    expect(onClick).toBeCalledTimes(1);
  });
});
