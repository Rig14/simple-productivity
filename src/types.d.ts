type Todo = {
  text: string;
  status: boolean;
};

type ToggleTodo = (selectedTodo: Todo) => void;

type AddTodo = (newTodo: string) => void;

type RemoveTodo = (todo: Todo) => void;
