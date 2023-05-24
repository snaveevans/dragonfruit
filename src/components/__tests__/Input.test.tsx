import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input, { Props } from "../Input";

describe("Input component", () => {
  const renderInput = (props?: Partial<Props>) => {
    const mockedEvent = vi.fn();
    render(<Input id="my-input" value="" {...props} onChange={mockedEvent} />);
    return [mockedEvent] as const;
  };

  test.skip("should have accessible name", () => {
    const id = "test-input";
    renderInput({ id });
    const input = screen.getByRole("textbox");
    expect(input).toHaveAccessibleName(id);
  });

  test("should render value correctly", () => {
    const testInput = "han solo";
    renderInput({ value: testInput });
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(testInput);
  });

  test("should correctly set data-testid", () => {
    const dataTestId = "some-input";
    renderInput({ "data-testid": dataTestId });
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-testid", dataTestId);
  });

  test("should call onChange event", async () => {
    const [mockedEvent] = renderInput();
    const input = screen.getByRole("textbox");
    const testInput = "han solo";
    await userEvent.type(input, testInput);
    // TODO validate typed `value`
    expect(mockedEvent).toBeCalledTimes(testInput.length);
    // expect(mockedEvent).toHaveBeenNthCalledWith(testInput.length, testInput);
  });

  test("should correctly set the className", () => {
    const className = "foobar";
    renderInput({ className });
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(className);
  });

  test("should correctly set type", () => {
    const type = "email";
    renderInput({ type });
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", type);
  });
});
