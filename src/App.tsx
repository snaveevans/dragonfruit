import { useCallback, useState } from "react";
import List from "./components/List";
import TaskForm from "./components/TaskForm";
import TaskListItem from "./components/TaskListItem";
import useUpsertEntity from "./hooks/useUpsertEntity";
import { Task } from "./models/Tasks";
import { useGetEntities } from "./hooks/useGetEntities";
import useRemoveEntity from "./hooks/useRemoveEntity";
import Button from "./components/Button";

function App() {
  const keyGetter = useCallback((entity: Task): string => entity.id, []);
  const upsertTask = useUpsertEntity<Task>("tasks", keyGetter);
  const removeTask = useRemoveEntity<Task>("tasks", keyGetter);
  const { entities, refetch } = useGetEntities("tasks");
  const [isGranted, setNotifications] = useState(
    Notification.permission === "granted"
  );
  const createTask = async (entity: Task) => {
    await upsertTask(entity);
    refetch();
  };
  const deleteTask = async (entity: Task) => {
    await removeTask(entity);
    refetch();
  };
  const enableNotifications = async () => {
    console.log("Notifications: ", window.Notification.permission);
    const result = await window.Notification.requestPermission();
    const isGranted = result !== "granted";
    if (!isGranted) {
      return;
    }
    setNotifications(isGranted);
  };
  const sendNotifications = () => {
    console.log("sending");
    setTimeout(() => {
      console.log("called");
      const n = new Notification("testing");
      setTimeout(n.close.bind(n), 4000);
    }, 5000);
  };

  return (
    <main className="lg:max-w-4xl lg:mx-auto my-2 mx-4">
      <h1 className="text-2xl font-bold">Dragonfruit</h1>
      <section>
        <List
          items={entities}
          keyGetter={(t) => t.id}
          renderer={(t) => (
            <TaskListItem task={t} onDelete={() => deleteTask(t)} />
          )}
          className="space-y-3"
        />
        <TaskForm onSubmit={createTask} />
      </section>
      {!isGranted && (
        <Button onClick={enableNotifications} fullWidth>
          Enable Notifications
        </Button>
      )}
      {isGranted && (
        <Button onClick={sendNotifications} fullWidth>
          Send Notification
        </Button>
      )}
    </main>
  );
}

export default App;
