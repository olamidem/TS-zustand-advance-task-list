import { FilterX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTodoStore } from "../store";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const {
    todos,
    lists,
    workspaces,
    selectedListId,
    selectedWorkspaceId,
    setSelectedListId,
    setSelectedWorkspaceId,
  } = useTodoStore();

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (selectedListId) {
      return todo.listId === selectedListId;
    }
    if (selectedWorkspaceId) {
      return todo.workspaceId === selectedWorkspaceId;
    }
    return true;
  });

  // Find selected item names
  const activeList = lists.find((l) => l.id === selectedListId);
  const activeWorkspace = workspaces.find((w) => w.id === selectedWorkspaceId);

  const handleClearFilters = () => {
    setSelectedListId(null);
    setSelectedWorkspaceId(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl select-none">
      {/* Header with active filter information */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Todo List
          </h3>
          {activeList && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <span>List:</span>
              <span className="font-semibold text-slate-800">
                {activeList.emoji} {activeList.name}
              </span>
            </span>
          )}
          {activeWorkspace && (
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <span>Workspace:</span>
              <span className="font-semibold text-slate-800">
                {activeWorkspace.emoji} {activeWorkspace.name}
              </span>
            </span>
          )}
        </div>

        {/* Clear Filter Action */}
        {(selectedListId || selectedWorkspaceId) && (
          <button
            onClick={handleClearFilters}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            title="Show All"
          >
            <FilterX size={13} />
            <span>Show All</span>
          </button>
        )}
      </div>

      {/* List container */}
      <div className="flex flex-col gap-1.5 min-h-[150px]">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredTodos.length > 0 ? (
            filteredTodos
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <TodoItem todo={todo} />
                </motion.div>
              ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2 border border-dashed border-slate-200/60 rounded-xl bg-slate-50/20"
            >
              <p className="text-sm">No tasks found</p>
              <p className="text-xs text-slate-300">
                {selectedListId || selectedWorkspaceId
                  ? "Try selecting another category or clear the active filter."
                  : "Start by writing a task in the field above."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default TodoList;
