import Sidebar from "./components/Sidebar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content Area */}
      <main className="grow p-8 md:p-12 lg:p-16 flex flex-col gap-10 max-w-5xl h-screen overflow-y-auto">
        {/* Simple Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-display tracking-tight text-slate-900">
            Workspace Planner
          </h1>
          <p className="text-sm text-slate-500">
            Organize and filter your tasks cleanly across lists and workspaces.
          </p>
        </div>

        {/* Form to add a new task */}
        <div className="flex flex-col gap-1">
          <TodoForm />
        </div>

        {/* Current task list */}
        <div className="flex flex-col gap-1">
          <TodoList />
        </div>
      </main>
    </div>
  );
};

export default App;
