import { Task } from "../models/Tasks";

export interface Props {
  task: Task;
}

export default function TaskListItem({ task }: Props) {
  return <>{task.name}</>;
}
