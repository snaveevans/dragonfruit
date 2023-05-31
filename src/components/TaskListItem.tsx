import { Task } from "../models/Tasks";
import Button from "./Button";

export interface Props {
  task: Task;
  onDelete: () => void;
}

export default function TaskListItem({ task, onDelete }: Props) {
  return (
    <span className="text-xl flex gap-2 justify-between">
      <span>{task.name}</span>
      <Button icon className="text-purple-700" onClick={onDelete}>
        <i className="fa-solid fa-circle-xmark"></i>
      </Button>
    </span>
  );
}
