import firebase from 'firebase'
import React from 'react'
import Navbar from '../components/Navbar'
import db, { auth } from '../firebase'

const Todo = () => {
  const getUserData = () => {
    const dbRef = db.collection('Users').doc(auth.currentUser?.uid);


    dbRef.get({source: 'server'}).then((doc) => {
      console.log(doc.data())
    }).catch(err=> {
      console.log('error')
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
