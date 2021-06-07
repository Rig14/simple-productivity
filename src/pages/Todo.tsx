import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TodoItem from '../components/TodoItem';
import db, { auth } from '../firebase';

const Todo = (): JSX.Element => {
  const [todos, setTodos] = useState<any>([]);

  const getUserData = () => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        // holy shit this actually works

        const userData = snapshot.data();

        const userTodoItems = userData?.todoItems;

        setTodos(userTodoItems);
      })
      .catch((error) => console.log(error.code));
  };

  // will load todoitems on page load
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="todos">
          {todos.map((item: string, index: number) => (
            <TodoItem id={index} value={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
