import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useTodoStore } from "../store";

const TodoForm = () => {
  const { lists, workspaces, addTodo, selectedListId, selectedWorkspaceId } =
    useTodoStore();
  const [text, setText] = useState("");
  const [listId, setListId] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");

  // Sync selected filters to the select dropdowns automatically
  useEffect(() => {
    if (selectedListId) {
      setListId(selectedListId);
    } else {
      setListId("");
    }
  }, [selectedListId]);

  useEffect(() => {
    if (selectedWorkspaceId) {
      setWorkspaceId(selectedWorkspaceId);
    } else {
      setWorkspaceId("");
    }
  }, [selectedWorkspaceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Use current states or fall back to empty string
    addTodo(text.trim(), listId, workspaceId);
    setText("");
    // We keep listId and workspaceId as selected for convenience when adding multiple tasks
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-2xl"
    >
      <input
        type="text"
        placeholder="Add a new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all shadow-sm"
        id="todo-input-text"
      />

      <div className="flex flex-wrap items-center gap-3">
        {/* Select List */}
        <select
          value={listId}
          onChange={(e) => setListId(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all cursor-pointer shadow-sm min-w-[150px]"
          id="select-list-dropdown"
        >
          <option value="">Select List</option>
          {lists.map((l) => (
            <option key={l.id} value={l.id}>
              {l.emoji} {l.name}
            </option>
          ))}
        </select>

        {/* Select Workspace */}
        <select
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all cursor-pointer shadow-sm min-w-[170px]"
          id="select-workspace-dropdown"
        >
          <option value="">Select Workspace</option>
          {workspaces.map((w) => (
            <option key={w.id} value={w.id}>
              {w.emoji} {w.name}
            </option>
          ))}
        </select>

        {/* Add Todo Button */}
        <button
          type="submit"
          disabled={!text.trim()}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
            text.trim()
              ? "bg-slate-950 text-white hover:bg-slate-800 active:scale-95 cursor-pointer"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
          id="add-todo-btn"
        >
          <Plus size={16} />
          <span>Add Todo</span>
        </button>
      </div>
    </form>
  );
}
export default TodoForm;