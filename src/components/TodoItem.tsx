/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';

interface TodoListItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TodoItem: React.FC<TodoListItemProps> = ({ todo, toggleTodo }) => {
  return (
    <>
      <li>
        <label>
          <input
            type="checkbox"
            checked={todo.status}
            onChange={() => toggleTodo(todo)}
          />
          {todo.text}
        </label>
      </li>
    </>
  );
};

export default TodoItem;
