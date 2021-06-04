import firebase from 'firebase'
import React from 'react'
import Navbar from '../components/Navbar'
import db, { auth } from '../firebase'

const Todo = () => {
  const getUserData = () => {
    db.collection('users').doc(auth.currentUser?.uid)
      .get()
      .then( snapshot => {
        //holy shit this actually works
        
        let userData = snapshot.data();

        let userTodoItems = userData?.todoItems;

        console.log(userTodoItems);
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <Navbar />
      <button onClick={getUserData}>get data</button>
    </div>
  )
}

export default Todo
