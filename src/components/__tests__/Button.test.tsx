import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { Props } from "../Button";

describe("Button component", () => {
  const renderButton = (props: Partial<Omit<Props, "onClick">> = {}) => {
    const mockedEvent = vi.fn();
    render(
      <Button {...props} onClick={mockedEvent}>
        {props?.children || "test"}
      </Button>
    );
    return [mockedEvent];
  };

  test("should render given text", () => {
    const text = "hello world";
    renderButton({ children: text });
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(text);
  });

  test("should render given data-testid", () => {
    const dataTestId = "some-button";
    renderButton({ "data-testid": dataTestId });
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-testid", dataTestId);
  });

  test("should trigger onClick event", async () => {
    const [mockedEvent] = renderButton();
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(mockedEvent).toHaveBeenCalledOnce();
  });

  test("should correctly set type", () => {
    renderButton({ type: "reset" });
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "reset");
  });

  test("should correctly add className", () => {
    const className = "foobar";
    renderButton({ className });
    const button = screen.getByRole("button");
    expect(button).toHaveClass(className);
  });
});
