type Todo = {
  task: string;
  state: boolean;
  id: number;
};

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (newTodo: string) => void;

type RemoveTodo = (removedTodo: Todo) => void;
