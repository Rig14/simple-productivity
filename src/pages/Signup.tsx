import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { auth } from '../firebase';

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(<></>)
  const history = useHistory()

  const signUp = (e: any) => {
    if (emailRef?.current?.value != null && passwordRef?.current?.value != null) {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then(user =>{
        history.push("/home")
      }).catch(err=>{
        const invalidEmail = "auth/invalid-email";
        const weakPassword = "auth/weak-password";
        const emailExists = "auth/email-already-exists";

        const error = err.code

        switch (error) {
          case invalidEmail:
            setError(<p>The email you entered is not in the correct format. Please check.</p>)
            break;
          case weakPassword:
            setError(<p>Password is too weak.</p>)
            break;
          case emailExists:
            setError(<p>The provided email is already in use.</p>)
        }
      })
    }
  }

  return (
    <div className="bg">
      <div className="form-box">
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
        <button onClick={signUp}>Create an account</button>
      </div>
    </div>
  )
}

export default SignIn
