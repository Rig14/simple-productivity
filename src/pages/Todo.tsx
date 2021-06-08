import React, { useEffect, useState } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

const LOCAL_STORAGE_KEY = 'simple-productivity-todos';

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[] | undefined>([]);

  // getting local storage todos if they exist
  useEffect(() => {
    if (todos !== undefined) {
      const userLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (userLocalStorage !== null) {
        const loadedTodos: Todo[] = JSON.parse(userLocalStorage);
        setTodos(loadedTodos);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    // changes the selected todos status to be the other
    if (todos !== undefined) {
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
    }
  };

  const addTodo: AddTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      // sets a new todo to the todos item list
      // also sets its id to "unique" number
      if (todos !== undefined) {
        setTodos([
          ...todos,
          { text: newTodo, status: false, id: Math.random() },
        ]);
      } else {
        setTodos([{ text: newTodo, status: false, id: Math.random() }]);
      }

      // adding the updated todos to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  };

  const removeTodo: RemoveTodo = (removedTodo) => {
    // removes a todo by useing its id and index

    if (todos !== undefined) {
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
