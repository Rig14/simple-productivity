/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const placeholder: Array<Todo> = [
  { text: 'aaaaaa', status: false },
  { text: '1213aa', status: true },
];

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState(placeholder);

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          status: !todo.status,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, status: false}]);
    }
  };

  const RemoveTodo: RemoveTodo = (todo) => {
    todos.pop()
  };

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodo addTodo={addTodo} />
    </>
  );
};

export default Todo;
