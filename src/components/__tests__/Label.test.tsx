import Label, { Props } from "../Label";
import { render, screen } from "@testing-library/react";

describe("Label component", () => {
  const renderLabel = (props?: Partial<Props>) => {
    render(
      <Label id="some-label" {...props}>
        {props?.children || "test"}
      </Label>
    );
  };

  test("should render children", () => {
    const text = "Han Solo";
    renderLabel({ children: text });
    const label = screen.getByText(text);
    expect(label).toHaveTextContent(text);
  });

  test("should render id and accessible name", () => {
    const id = "my-label";
    renderLabel({ id });
    const label = screen.getByText("test");
    expect(label).toHaveAttribute("id", id);
    expect(label).toHaveAttribute("for", id);
  });

  test("should render className", () => {
    const className = "my-class";
    renderLabel({ className });
    const label = screen.getByText("test");
    expect(label).toHaveClass(className);
  });

  test("should render data-testid", () => {
    const dataTestId = "my-class";
    renderLabel({ "data-testid": dataTestId });
    const label = screen.getByText("test");
    expect(label).toHaveAttribute("data-testid", dataTestId);
  });
});
