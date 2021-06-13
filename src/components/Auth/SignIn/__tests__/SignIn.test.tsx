import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInComponent from "..";
import { useFormik } from "formik";
import { SigninUserType } from "types/authTypes";
import { act } from "react-dom/test-utils";

describe("Render Signin Component", () => {
  let formik: any;
  let RenderFunc: any;
  beforeEach(() => {
    RenderFunc = () => {
      formik = useFormik<SigninUserType>({
        initialValues: {
          email: "test@gmail.com",
          password: "123456",
        },
        onSubmit: (values: SigninUserType) => {},
      });
      return null;
    };
    render(<RenderFunc />);
  });
  test("Test if signin render", async () => {
    const onSubmit = jest.fn();
    const { container } = render(<SignInComponent onSubmit={onSubmit} />);

    expect(container).toBeInTheDocument();
  });
  test("Test if values is truthy", async () => {
    const { values } = formik;

    expect(values).toBeTruthy();
  });
  test("Test if email is correct", async () => {
    const { values } = formik;

    expect(values.email).toEqual("test@gmail.com");
  });
  test("Test if input fields have correct", async () => {
    const handleSubmit = jest.fn();

    render(<SignInComponent onSubmit={handleSubmit} />);

    const form = screen.getByTestId("sign-in-form");
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.submit(form);
    });

    expect(screen.getByDisplayValue('test@gmail.com')).toBeDefined();
    expect(screen.getByDisplayValue('123456')).toBeDefined();
  });
});
