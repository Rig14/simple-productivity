import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo: ToggleTodo;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
}): JSX.Element => {
  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem key={todo.text} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </ul>
  );
};

export default TodoList;
