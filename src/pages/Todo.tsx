import React from 'react'
import Navbar from '../components/Navbar'
import db, { auth } from '../firebase'

const Todo = () => {
  const getUserData = () => {
    const dbRef = db.collection('Users').doc(auth.currentUser?.uid);

    dbRef.get({source: 'default'}).then((doc) => {
      console.log(doc.data())
    }).catch(err=> {
      console.log(err.message)
    }) 
  }

  return (
    <div>
      <Navbar />
      <button onClick={getUserData}>get data</button>
    </div>
  )
}

export default Todo
