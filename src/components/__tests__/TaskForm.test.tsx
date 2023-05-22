import { render, screen } from "@testing-library/react";
import TaskForm from "../TaskForm";

describe("TaskForm component", () => {
  test("should render", () => {
    render(<TaskForm />);
    const content = screen.getByTestId("content");
    expect(content.textContent).toBe("task form");
  });
});
