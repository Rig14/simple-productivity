/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

interface TodoListItemProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
}

const TodoItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleTodo,
  removeTodo,
}) => {
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
          <button type="button" onClick={() => removeTodo(todo)}>
            X
          </button>
          <p>id {todo.id}</p>
        </label>
      </li>
    </>
  );
};

export default TodoItem;
