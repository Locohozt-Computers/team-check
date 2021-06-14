import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Dropdown from "..";

describe("Dropdown component", () => {
  test("should render Dropdown component", () => {
    const menus = [
      {
        id: 1,
        name: "Dashboard",
        route: "/home",
      },
    ];
    const { container } = render(<Dropdown menus={menus} />);

    expect(container).toBeInTheDocument();
  });
  test("should display dashboard as menu", () => {
    const menus = [
      {
        id: 1,
        name: "Dashboard",
        route: "/home",
      },
    ];
    render(<Dropdown menus={menus} />);

    expect(screen.getByText("Dashboard")).not.toBeNull();
  });
  test("should display dashboard as menu - pass", () => {
    const menus = [
      {
        id: 1,
        name: "Dashboard",
        route: "/home",
      },
    ];
    render(<Dropdown menus={menus} />);

    expect(screen.queryByTestId("menu-1")).toBeTruthy();
    expect(screen.queryByTestId("menu-1")?.textContent).toBe("Dashboard");
    expect(screen.getByText("Dashboard")).not.toBeNull();
  });
  test("should display Logout as menu - pass", () => {
    const menus = [
      {
        id: 1,
        name: "Dashboard",
        route: "/home",
      },
      {
        id: 2,
        name: "Logout",
        route: "/auth/signin",
      },
    ];
    render(<Dropdown menus={menus} />);

    expect(screen.queryByTestId("menu-2")).toBeTruthy();
    expect(screen.queryByTestId("menu-2")?.textContent).toBe("Logout");
    expect(screen.getByText("Logout")).not.toBeNull();
  });
  test("should match snapshot", () => {
    const menus = [
      {
        id: 1,
        name: "Dashboard",
        route: "/home",
      },
    ];
    const componentSnapshot = renderer.create(<Dropdown menus={menus} />);

    expect(componentSnapshot.toJSON).toMatchSnapshot();
  });
});
