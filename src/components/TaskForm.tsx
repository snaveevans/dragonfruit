import { FormEvent, useMemo } from "react";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import TextField from "./TextField";

interface TaskEditModel {
  name: string;
}
interface Props {
  onSubmit: (model: TaskEditModel) => void;
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
    props.onSubmit({ name });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="content"
      className="my-2 grid gap-2"
    >
      <span className="flex gap-2">
        <TextField
          className="flex gap-2 grow"
          inputProps={{ className: "grow" }}
          id="task-name"
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Button data-testid="taskform:submit" type="submit">
          Create
        </Button>
      </span>
    </form>
  );
}

export default TaskForm;
