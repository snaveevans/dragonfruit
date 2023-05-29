import { useCallback } from "react";
import List from "./components/List";
import TaskForm from "./components/TaskForm";
import TaskListItem from "./components/TaskListItem";
import useUpsertEntity from "./hooks/useUpsertEntity";
import { Task } from "./models/Tasks";
import { useGetEntities } from "./hooks/useGetEntities";

function App() {
  const keyGetter = useCallback((entity: Task): string => entity.id, []);
  const upsertTask = useUpsertEntity<Task>("tasks", keyGetter);
  const { entities, refetch } = useGetEntities("tasks");
  const createTask = async (entity: Task) => {
    await upsertTask(entity);
    refetch();
  };

  return (
    <main className="lg:max-w-4xl lg:mx-auto my-2 mx-4">
      <h1 className="text-2xl font-bold">Dragonfruit</h1>
      <section>
        <List
          items={entities}
          keyGetter={(t) => t.id}
          renderer={(t) => <TaskListItem task={t} />}
        />
        <TaskForm onSubmit={createTask} />
      </section>
    </main>
  );
}

export default App;
