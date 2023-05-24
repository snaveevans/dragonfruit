import TextField, { Props } from "../TextField";
import { render, screen } from "@testing-library/react";

describe("TextField component", () => {
  const renderLabel = (props?: Partial<Props>) => {
    const mockedEvent = vi.fn();
    render(
      <TextField
        id="some-label"
        label="some-label"
        value=""
        onChange={mockedEvent}
        {...props}
      />
    );
  };

  test("should be accessible", () => {
    const label = "my-textfield";
    renderLabel({ label });
    const input = screen.getByRole("textbox");
    expect(input).toHaveAccessibleName(label);
  });

  test("should have the same ids", () => {
    const id = "my-id";
    const label = "my-textfield";
    renderLabel({ id, label });
    const input = screen.getByRole("textbox");
    const labelEl = screen.getByText(label);
    expect(input).toHaveAttribute('id', id);
    expect(labelEl).toHaveAttribute('id', id);
  });
});
