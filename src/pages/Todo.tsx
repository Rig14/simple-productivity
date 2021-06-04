import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import db, { auth } from '../firebase'


const Todo = () => {

  const getData = () => {

    /*
    db.collection('users').onSnapshot(snap => {
      console.log(snap.docs.map(doc=>doc.data().todoItems));
    })
    */
  }

  return (
    <div>
      <Navbar />
      <button onClick={() => getData()}>
        get data
      </button>
    </div>
  )
}

export default Todo
