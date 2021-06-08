import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Array<Todo> | undefined;
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  removeTodo,
}): JSX.Element => {
  return (
    <ul>
      {todos?.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
