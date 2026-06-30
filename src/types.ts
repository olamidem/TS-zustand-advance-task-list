export interface List {
  id: string;
  name: string;
  emoji: string;
}

export interface Workspace {
  id: string;
  name: string;
  emoji: string;
}

export interface Todo {
  id: string;
  text: string;
  listId: string;
  workspaceId: string;
  completed: boolean;
  createdAt: number;
}

export interface TodoStore {
  todos: Todo[];
  lists: List[];
  workspaces: Workspace[];

  selectedListId: string | null;
  selectedWorkspaceId: string | null;
  setSelectedListId: (id: string | null) => void;
  setSelectedWorkspaceId: (id: string | null) => void;

  // Actions
  addTodo: (text: string, listId: string, workspaceId: string) => void;
  updateTodo: (
    id: string,
    text: string,
    listId: string,
    workspaceId: string,
    completed?: boolean,
  ) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;

  addList: (name: string, emoji: string) => void;
  deleteList: (id: string) => void;

  addWorkspace: (name: string, emoji: string) => void;
  deleteWorkspace: (id: string) => void;
}
