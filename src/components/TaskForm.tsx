import { FormEvent, useMemo } from "react";
import { useState } from "react";
import Button from "./Button";
import TextField from "./TextField";
import { Task } from "../models/Tasks";
import { v4 as uuid } from "uuid";

interface Props {
  onSubmit: (model: Task) => void;
}

function TaskForm(props: Props) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isValid = useMemo(() => {
    if (name.trim().length === 0) {
      return false;
    }

    return true;
  }, [name]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) {
      return;
    }
    props.onSubmit({ name, id: uuid() });
    setSubmitted(false);
    setName("");
  };
  const showError = submitted && !isValid;
  const helperText = showError ? "Task information required" : "";

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="content"
      className="my-2 grid gap-2"
    >
      <TextField
        className="flex flex-col md:flex-row"
        inputProps={{ className: "grow" }}
        id="task-name"
        value={name}
        placeholder="Example: Change furnace filter every month"
        label="Task information"
        onChange={(e) => setName(e.target.value)}
        helperText={helperText}
        error={showError}
      />
      <Button
        className="ml-auto"
        data-testid="taskform:submit"
        type="submit"
        fullWidth={false}
      >
        Create
      </Button>
    </form>
  );
}

export default TaskForm;
