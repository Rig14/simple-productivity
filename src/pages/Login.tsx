import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = (e: any) => {
    if (emailRef?.current?.value != null && passwordRef?.current?.value != null) {
      e.preventDefault();

      auth.signInWithEmailAndPassword(
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
        <h1>Login</h1>
        <input type="email" 
        ref={emailRef}
        placeholder="Email..."/>
        <input type="password" 
        ref={passwordRef}
        placeholder="Password..."/>

        <button onClick={login}>Login</button>
        <p>Not a user? 
          <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
