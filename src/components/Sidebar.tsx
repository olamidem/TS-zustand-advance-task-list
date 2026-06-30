import React, { useState } from "react";
import { useTodoStore } from "../store";
import { Plus, Trash2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PRESETS_EMOJIS = [
  "👋",
  "🚀",
  "💻",
  "🤷",
  "😬",
  "📅",
  "💡",
  "🎨",
  "📚",
  "🛒",
  "🍕",
  "💪",
  "🔥",
  "🎯",
];

export default function Sidebar() {
  const {
    lists,
    workspaces,
    selectedListId,
    selectedWorkspaceId,
    setSelectedListId,
    setSelectedWorkspaceId,
    addList,
    deleteList,
    addWorkspace,
    deleteWorkspace,
  } = useTodoStore();

  const [isAddingList, setIsAddingList] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedListEmoji, setSelectedListEmoji] = useState("👋");

  const [isAddingWorkspace, setIsAddingWorkspace] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedWorkspaceEmoji, setSelectedWorkspaceEmoji] = useState("🚀");

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return;
    addList(listName.trim(), selectedListEmoji);
    setListName("");
    setSelectedListEmoji("👋");
    setIsAddingList(false);
  };

  const handleAddWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;
    addWorkspace(workspaceName.trim(), selectedWorkspaceEmoji);
    setWorkspaceName("");
    setSelectedWorkspaceEmoji("🚀");
    setIsAddingWorkspace(false);
  };

  return (
    <aside className="w-64 border-r border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-8 h-screen overflow-y-auto select-none">
      {/* Lists Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800 tracking-tight">
            Lists
          </h2>
        </div>

        <ul className="flex flex-col gap-1">
          {lists.map((list) => (
            <li
              key={list.id}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                selectedListId === list.id
                  ? "bg-slate-200/70 font-semibold text-slate-900"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
              onClick={() => setSelectedListId(list.id)}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span
                  className="text-base flex-shrink-0"
                  role="img"
                  aria-label={list.name}
                >
                  {list.emoji}
                </span>
                <span className="truncate">{list.name}</span>
              </div>

              {/* Delete list button (visible on hover, except for default list items if we want to protect them, but let the user delete anything) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      `Are you sure you want to delete the list "${list.name}"?`,
                    )
                  ) {
                    deleteList(list.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity"
                title="Delete List"
              >
                <Trash2 size={13} />
              </button>
            </li>
          ))}
        </ul>

        {/* Add List Trigger/Form */}
        <AnimatePresence mode="wait">
          {!isAddingList ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingList(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-all text-left w-full cursor-pointer mt-1"
            >
              <Plus size={16} />
              <span>List</span>
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleAddList}
              className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm flex flex-col gap-2.5 mt-1"
            >
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="List name..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-slate-400 transition-colors"
                  autoFocus
                />
              </div>

              {/* Emoji Picker Row */}
              <div className="flex flex-wrap gap-1 max-h-[64px] overflow-y-auto p-0.5 border border-slate-100 rounded bg-slate-50">
                {PRESETS_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedListEmoji(emoji)}
                    className={`text-sm w-6 h-6 flex items-center justify-center rounded transition-all hover:bg-slate-200/80 ${
                      selectedListEmoji === emoji
                        ? "bg-slate-200 ring-1 ring-slate-400 scale-110"
                        : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setIsAddingList(false)}
                  className="px-2 py-1 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <Check size={12} /> Add
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Workspaces Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800 tracking-tight">
            Workspaces
          </h2>
        </div>

        <ul className="flex flex-col gap-1">
          {workspaces.map((workspace) => (
            <li
              key={workspace.id}
              className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                selectedWorkspaceId === workspace.id
                  ? "bg-slate-200/70 font-semibold text-slate-900"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
              onClick={() => setSelectedWorkspaceId(workspace.id)}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span
                  className="text-base flex-shrink-0"
                  role="img"
                  aria-label={workspace.name}
                >
                  {workspace.emoji}
                </span>
                <span className="truncate">{workspace.name}</span>
              </div>

              {/* Delete workspace button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    confirm(
                      `Are you sure you want to delete the workspace "${workspace.name}"?`,
                    )
                  ) {
                    deleteWorkspace(workspace.id);
                  }
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity"
                title="Delete Workspace"
              >
                <Trash2 size={13} />
              </button>
            </li>
          ))}
        </ul>

        {/* Add Workspace Trigger/Form */}
        <AnimatePresence mode="wait">
          {!isAddingWorkspace ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingWorkspace(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-all text-left w-full cursor-pointer mt-1"
            >
              <Plus size={16} />
              <span>Workspaces</span>
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleAddWorkspace}
              className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm flex flex-col gap-2.5 mt-1"
            >
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Workspace name..."
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-slate-400 transition-colors"
                  autoFocus
                />
              </div>

              {/* Emoji Picker Row */}
              <div className="flex flex-wrap gap-1 max-h-[64px] overflow-y-auto p-0.5 border border-slate-100 rounded bg-slate-50">
                {PRESETS_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedWorkspaceEmoji(emoji)}
                    className={`text-sm w-6 h-6 flex items-center justify-center rounded transition-all hover:bg-slate-200/80 ${
                      selectedWorkspaceEmoji === emoji
                        ? "bg-slate-200 ring-1 ring-slate-400 scale-110"
                        : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setIsAddingWorkspace(false)}
                  className="px-2 py-1 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <Check size={12} /> Add
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
