import React, { useEffect, useRef, useState } from 'react';
import AddTodo from '../components/AddTodo';
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';
import db, { auth } from '../firebase';

const LOCAL_STORAGE_KEY = 'simple-productivity-todos';

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
  const userLeftPageRef = useRef(false);

  useEffect(() => {
    // om mount will get stored user todos if they exist
    // todos is alaways undefined if page is reloded
    if (todos === undefined) {
      // first we check if the user is not logged in,
      // then we set todos to the stored todos int theyr local storage
      if (auth.currentUser === null) {
        const userLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

        // if the local storage is empty then will give back empty array
        if (userLocalStorage !== null) {
          const loadedTodos: Todo[] = JSON.parse(userLocalStorage);
          setTodos(loadedTodos);
        } else {
          setTodos([]);
        }
        // if the user is logged in then will get user todos
      } else {
        // reftences the user doc
        const dataRef = db.collection('users').doc(auth.currentUser?.uid);
        // gets the data off that doc
        dataRef.get().then((doc) => {
          const userData = doc.data();

          // setting the todos to be the data from firestore
          const userTodos = userData?.todoItems;
          setTodos(userTodos);
        });
      }
    }
    // unmount: setting up the uploading to database
    // cant access todos from here after unmount
    // took me about a hour to figure this out
    return () => {
      userLeftPageRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (userLeftPageRef.current === true) {
        // if user is signed in writes data to firestore
        if (auth.currentUser !== null) {
          db.collection('users')
            .doc(auth.currentUser?.uid)
            .update({ todoItems: todos });
          // otherwise writes to local storage
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        }
      }
    };
  }, [todos]);

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    // changes the selected todos state to be the other
    if (todos !== undefined) {
      const newTodos = todos.map((todo) => {
        if (todo === selectedTodo) {
          return {
            ...todo,
            state: !todo.state,
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
          { task: newTodo, state: false, id: Math.random() },
        ]);
      } else {
        setTodos([{ task: newTodo, state: false, id: Math.random() }]);
      }
    }
  };

  const removeTodo: RemoveTodo = (removedTodo) => {
    // removes a todo by using its id and index

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
      <Navbar />
      <div className="page-content">
        <h1>Todo List</h1>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
        <AddTodo addTodo={addTodo} />
      </div>
    </>
  );
};

export default Todo;
