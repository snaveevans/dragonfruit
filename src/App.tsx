import List from "./components/List";
import TaskForm from "./components/TaskForm";
import TaskListItem from "./components/TaskListItem";
import { Task } from "./models/Tasks";

const tasks: Task[] = [
  { id: "1", name: "change oil" },
  { id: "2", name: "change furnace filter" },
  { id: "3", name: "add water softner salt" },
];

function App() {
  return (
    <main className="lg:max-w-4xl lg:mx-auto my-2 mx-4">
      <h1 className="text-2xl font-bold">Dragonfruit</h1>
      <section>
        <List
          items={tasks}
          keyGetter={(t) => t.id}
          renderer={(t) => <TaskListItem task={t} />}
        />
        <TaskForm onSubmit={(e) => console.log(e)} />
      </section>
    </main>
  );
}

export default App;
