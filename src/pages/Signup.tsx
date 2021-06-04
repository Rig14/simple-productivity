import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router';
import db, { auth } from '../firebase';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(<></>)
  const [signupButton, setSignupButton] = useState(true);
  const history = useHistory()

  const signUp = (e: any) => {
    if (emailRef?.current?.value != null && passwordRef?.current?.value != null) {
      e.preventDefault();
      setSignupButton(false);
      auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then(user =>{
        setSignupButton(true);
        history.push("/home")

        //creation of the database
        db.collection('users').doc(user?.user?.uid).set({
          todoItems: []
        })
      }).catch(err=>{
        setSignupButton(true)

        const invalidEmail = "auth/invalid-email";
        const weakPassword = "auth/weak-password";
        const emailExists = "auth/email-already-exists";
        const emailInUse = "auth/email-already-in-use";

        const error = err.code

        switch (error) {
          case invalidEmail:
            setError(<p>The email you entered is not in the correct format. Please check.</p>)
            break;
          case weakPassword:
            setError(<p>Password is too weak.</p>)
            break;
          case emailInUse: 
          case emailExists:
            setError(<p>The provided email is already in use.</p>)
        }
      })
    }
  }

  const back = () => {
    history.goBack();
  }

  let button = <button onClick={signUp}>Create an account</button>

  if (signupButton) {
    button = <button onClick={signUp}>Create an account</button>
  } else {
    button = <button onClick={signUp} disabled>Create an account</button>
  }

  return (
    <div className="bg">
      <div className="form-box">
        <button onClick={back}>X</button>
        <h1>Create an account</h1>
        <p>Gain access to additional features 
          such as Graphs and Saves.</p>
        <input type="email" 
        ref={emailRef}
        placeholder="Enter your email address..."/>
        <input type="password" 
        ref={passwordRef}
        placeholder="Enter your password..."/>
        {error}
        {button}
      </div>
    </div>
  )
}

export default SignUp
