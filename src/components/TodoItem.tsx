import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Edit2, Trash2, Check, X } from "lucide-react";
import type { Todo } from "../types";
import { useTodoStore } from "../store";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { lists, workspaces, updateTodo, deleteTodo, toggleTodo } =
    useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // States for editing
  const [editText, setEditText] = useState(todo.text);
  const [editListId, setEditListId] = useState(todo.listId);
  const [editWorkspaceId, setEditWorkspaceId] = useState(todo.workspaceId);

  const menuRef = useRef<HTMLDivElement>(null);

  // Find names & emojis for list and workspace
  const todoList = lists.find((l) => l.id === todo.listId);
  const todoWorkspace = workspaces.find((w) => w.id === todo.workspaceId);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editText.trim()) return;
    updateTodo(todo.id, editText.trim(), editListId, editWorkspaceId);
    setIsEditing(false);
  };

  return (
    <div className="relative group/item flex items-center justify-between py-2 px-3 hover:bg-slate-50/70 rounded-xl transition-all">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            onSubmit={handleUpdate}
            className="flex flex-wrap items-center gap-2.5 w-full bg-slate-50 border border-slate-200/80 p-3 rounded-xl shadow-inner"
          >
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="grow min-w-[200px] text-sm bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-slate-400"
              autoFocus
            />

            <select
              value={editListId}
              onChange={(e) => setEditListId(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none"
            >
              <option value="">No List</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.emoji} {l.name}
                </option>
              ))}
            </select>

            <select
              value={editWorkspaceId}
              onChange={(e) => setEditWorkspaceId(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none"
            >
              <option value="">No Workspace</option>
              {workspaces.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.emoji} {w.name}
                </option>
              ))}
            </select>

            <div className="flex gap-1 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setEditText(todo.text);
                  setEditListId(todo.listId);
                  setEditWorkspaceId(todo.workspaceId);
                  setIsEditing(false);
                }}
                className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors cursor-pointer"
                title="Cancel"
              >
                <X size={15} />
              </button>
              <button
                type="submit"
                className="p-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Save"
              >
                <Check size={15} />
              </button>
            </div>
          </motion.form>
        ) : (
          <div className="flex items-center justify-between w-full">
            {/* Left Content */}
            <div className="flex items-start gap-2.5 max-w-[85%] select-text">
              {/* Checkbox Bullet */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`mt-1.5 w-3 h-3 rounded-full border shrink-0 transition-all ${
                  todo.completed
                    ? "bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600"
                    : "bg-white border-slate-300 hover:border-slate-500"
                }`}
                title={
                  todo.completed ? "Mark as incomplete" : "Mark as complete"
                }
              />

              <div className="flex flex-col">
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`text-sm text-slate-800 transition-all cursor-pointer break-all ${
                    todo.completed
                      ? "line-through text-slate-400 font-normal"
                      : "font-medium"
                  }`}
                >
                  {todo.text}
                </span>

                {/* Subtext info */}
                <span className="text-xs text-slate-400 mt-0.5">
                  {todoList || todoWorkspace ? (
                    <>
                      ({todoList && `List: ${todoList.name}`}
                      {todoList && todoWorkspace && ", "}
                      {todoWorkspace && `Workspace: ${todoWorkspace.name}`})
                    </>
                  ) : (
                    "(No List / Workspace)"
                  )}
                </span>
              </div>
            </div>

            {/* Right Action Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-800 rounded-lg transition-colors cursor-pointer opacity-0 group-hover/item:opacity-100"
              >
                <MoreVertical size={16} />
              </button>

              {/* Action Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>Update</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (
                          confirm("Are you sure you want to delete this todo?")
                        ) {
                          deleteTodo(todo.id);
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoItem;
