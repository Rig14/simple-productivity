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
        setLoginButton(true);
      }).catch(err=>{
        const wrongPassword: String = "auth/wrong-password";
        const wrongEmail: String = "auth/user-not-found";
        const invalidEmail: String = "auth/invalid-email";
        const tooManyRequests: String = "auth/too-many-requests";

        const error = err.code;

        switch (error) {
          case wrongEmail:
            setError(<p>Your email and password do not match. Please try again.</p>);
            break;
          case wrongPassword:
            setError(<p>Your password does not match. Please try again.</p>);
            break;
          case invalidEmail:
            setError(<p>Email is not valid</p>);
            break;
          case tooManyRequests:
            setError(<p>Access to this account has been temporarily disabled due to many failed login attempts.</p>)
        }
        const emailLength = emailRef.current?.value.length;
        const passwordLength = passwordRef.current?.value.length;

        if (emailLength === 0 && passwordLength === 0) {
          setError(<p>Please enter your email and password</p>)
        } else if (emailLength === 0) {
          setError(<p>Email required</p>);
        } else if (passwordLength === 0) {
          setError(<p>Password required</p>)
        } 

        setLoginButton(true);
      })
    }
  }

  const back = () => {
    history.goBack();
  }

  if (loginButton) {
    button = <button onClick={login}>Login</button>
  } else {
    button = <button onClick={login} disabled>Login</button>
  }

  return (
    <div className="bg">
      <div className="form-box">
        <button onClick={back}>X</button>
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
