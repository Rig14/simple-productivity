import React from 'react';
import Navbar from '../components/Navbar';
import db, { auth } from '../firebase';

const Todo = (): JSX.Element => {
  const getUserData = () => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        // holy shit this actually works

        const userData = snapshot.data();

        const userTodoItems = userData?.todoItems;

        console.log(userTodoItems);
      })
      .catch((error) => console.log(error.code));
  };

  return (
    <div>
      <Navbar />
      <button onClick={getUserData} type="button">
        get data
      </button>
    </div>
  );
};

export default Todo;
