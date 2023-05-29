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
  const isValid = useMemo(() => {
    if (name.trim().length === 0) {
      return false;
    }

    return true;
  }, [name]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    props.onSubmit({ name, id: uuid() });
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="content"
      className="my-2 grid gap-2"
    >
      <span className="flex flex-col md:flex-row gap-2 items-end">
        <TextField
          className="flex flex-col gap-2"
          inputProps={{ className: "grow" }}
          id="task-name"
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </span>
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
