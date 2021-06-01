import React, { useRef } from 'react'
import { auth } from '../firebase';

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signUp = (e: any) => {
    if (emailRef?.current?.value != null && passwordRef?.current?.value != null) {
      e.preventDefault();
      auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then(user =>{
        console.log(user);
      }).catch(err=>{
        console.log(err);
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

        <button onClick={signUp}>Create an account</button>
      </div>
    </div>
  )
}

export default SignIn
