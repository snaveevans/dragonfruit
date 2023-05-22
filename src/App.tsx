import { useState } from "react";
import Button from "./components/Button";
import TaskForm from "./components/TaskForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="lg:max-w-4xl lg:mx-auto my-2 mx-4">
      <h1 className="text-2xl font-bold">Dragonfruit</h1>
      <section>
        <h2 className="text-xl font-bold">Tasks</h2>
        <TaskForm />
        <Button
          className="rounded-full"
          onClick={() => setCount((count) => count + 1)}
        >
          Count: {count}
        </Button>
      </section>
    </main>
  );
}

export default App;
