import TaskForm from "./components/TaskForm";

function App() {
  return (
    <main className="lg:max-w-4xl lg:mx-auto my-2 mx-4">
      <h1 className="text-2xl font-bold">Dragonfruit</h1>
      <section>
        <h2 className="text-xl font-bold">Tasks</h2>
        <TaskForm onSubmit={(e) => console.log(e)} />
      </section>
    </main>
  );
}

export default App;
