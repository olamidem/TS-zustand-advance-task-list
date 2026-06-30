import { create } from "zustand";
import { TodoStore } from "./types";

export const useTodoStore = create<TodoStore>((set) => ({
  lists: [
    { id: "list-1", name: "My Personal Info", emoji: "👋" },
    { id: "list-2", name: "something", emoji: "🤷" },
  ],
  workspaces: [
    { id: "ws-1", name: "Programming", emoji: "🚀" },
    { id: "ws-2", name: "new workspace", emoji: "😬" },
  ],
  todos: [
    {
      id: "todo-1",
      text: "random crap",
      listId: "list-2",
      workspaceId: "ws-2",
      completed: false,
      createdAt: Date.now(),
    },
  ],

  selectedListId: null,
  selectedWorkspaceId: null,
  setSelectedListId: (id) =>
    set((state) => ({
      selectedListId: state.selectedListId === id ? null : id,
      selectedWorkspaceId: null, // mutually exclusive or independent? Let's make them mutually exclusive or clear workspace to avoid empty listings
    })),
  setSelectedWorkspaceId: (id) =>
    set((state) => ({
      selectedWorkspaceId: state.selectedWorkspaceId === id ? null : id,
      selectedListId: null,
    })),

  addTodo: (text, listId, workspaceId) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          text,
          listId,
          workspaceId,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    })),

  updateTodo: (id, text, listId, workspaceId, completed) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text,
              listId,
              workspaceId,
              completed: completed !== undefined ? completed : todo.completed,
            }
          : todo,
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  addList: (name, emoji) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: `list-${Date.now()}`,
          name,
          emoji,
        },
      ],
    })),

  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((l) => l.id !== id),
      todos: state.todos.map((todo) =>
        todo.listId === id ? { ...todo, listId: "" } : todo,
      ),
    })),

  addWorkspace: (name, emoji) =>
    set((state) => ({
      workspaces: [
        ...state.workspaces,
        {
          id: `ws-${Date.now()}`,
          name,
          emoji,
        },
      ],
    })),

  deleteWorkspace: (id) =>
    set((state) => ({
      workspaces: state.workspaces.filter((w) => w.id !== id),
      todos: state.todos.map((todo) =>
        todo.workspaceId === id ? { ...todo, workspaceId: "" } : todo,
      ),
    })),
}));
