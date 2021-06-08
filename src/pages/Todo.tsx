import React, { useState } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const initial: Array<Todo> = [
  { text: 'aaaaaa', status: false, id: Math.random() },
];

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState(initial);

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    // changes the selected todos status to be the other
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
      // sets a new todo to the todos item list
      // also sets its id to "unique" number
      setTodos([...todos, { text: newTodo, status: false, id: Math.random() }]);
    }
  };

  const removeTodo: RemoveTodo = (removedTodo) => {
    // removes a todo by useing its id and index

    for (let i = 0; i < todos.length; i += 1) {
      const todo = todos[i];

      // if the todo object has same id as the one that is to be removed
      if (todo.id === removedTodo.id) {
        // filters it out by excluding it in the new array
        // this is nessecary to update the screen
        const newTodos = todos.filter((val, idx) => {
          return idx !== i;
        });
        setTodos(newTodos);
      }
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
      <AddTodo addTodo={addTodo} />
    </>
  );
};

export default Todo;
