import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(<></>);
  const [loginButton, setLoginButton] = useState(true);
  let button: JSX.Element;
  const history = useHistory()

  const login = (e: any) => {
    
    if (emailRef?.current?.value != null && passwordRef?.current?.value != null) {
      e.preventDefault();
      setLoginButton(false);
      auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      ).then( (e) =>{
        history.goBack();
        console.log(e);
        setLoginButton(true);
      }).catch(err=>{
        const wrongPassword: String = "auth/wrong-password";
        const wrongEmail: String = "auth/user-not-found";

        const error = err.code

        switch (error) {
          case wrongEmail:
            setError(<p>Your email and password do not match. Please try again.</p>)
            break;
          case wrongPassword:
            setError(<p>Your password does not match. Please try again.</p>)
        }
      })
      
    }
  }
  if (loginButton) {
    button = <button onClick={login}>Login</button>
  } else {
    button = <button onClick={login} disabled>Login</button>
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
        {error}
        {button}
        <p>Not a user? 
          <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
