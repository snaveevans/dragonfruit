import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../TaskForm";

describe("TaskForm component", () => {
  const renderForm = () => {
    const mockedEvent = vi.fn();
    render(<TaskForm onSubmit={mockedEvent} />);
    return [mockedEvent];
  };

  test("should render label", () => {
    renderForm();
    const nameLabel = screen.getByText("Name");
    expect(nameLabel).toHaveTextContent("Name");
  });

  test("should return input on submit", async () => {
    const [mockedEvent] = renderForm();
    const testInput = "change oil";
    const nameInput = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    await userEvent.type(nameInput, testInput);
    await userEvent.click(submitButton);
    expect(mockedEvent).toBeCalledWith(
      expect.objectContaining({ name: testInput })
    );
  });

  test("should not pass validation", async () => {
    const [mockedEvent] = renderForm();
    const submitButton = screen.getByRole("button");

    await userEvent.click(submitButton);
    expect(mockedEvent).not.toBeCalled();
  });

  test("should have accessible name", () => {
    renderForm();
    const nameLabel = screen.getByLabelText("Name");
    expect(nameLabel).toHaveAccessibleName("Name");
  });
});
