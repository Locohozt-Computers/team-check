import { render } from "@testing-library/react";
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
