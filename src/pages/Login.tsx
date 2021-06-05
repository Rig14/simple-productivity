import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import Close from "../assets/icons/close-icon.svg"
import Email from "../assets/icons/email.svg"
import Password from "../assets/icons/padlock.svg"

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
        const userNotFound: String = 'auth/user-not-found'
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
            setError(<p>Email is not valid.</p>);
            break;
          case tooManyRequests:
            setError(<p>Access to this account has been temporarily disabled due to many failed login attempts.</p>)
            break;
          case userNotFound:
            setError(<p>User does not exist. <Link to="/signup">Create an account</Link></p>)
            break;
          default:
            setError(<p>Something went wrong. Please try again.</p>)

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
  
  //if user is logged in and tries to view this
  //component then push user back
  if (auth.currentUser?.uid != null) {
    back()
  }

  if (loginButton) {
    button = <button onClick={login} className="form-button">Log in</button>
  } else {
    button = <button onClick={login} disabled className="form-button-disabled">Log in</button>
  }

  return (
    <div className="bg">
      <div className="form-box">
        <div className="button-div">
          <button onClick={back} className="go-back">
            <img src={Close} alt="close" />
          </button>
        </div>
        
        <h1>Login</h1>
        <div className="input-container">
          <div>
            <img src={Email} alt="email" />
            <input type="email" 
            ref={emailRef}
            placeholder="Email..."
            className="email-box" />
          </div>
          <div>
            <img src={Password} alt="password" />
            <input type="password" 
            ref={passwordRef}
            placeholder="Password..."
            className="password-box" />
          </div>

        </div>
        <div className="error-div">
          {error}
        </div>

          {button}

        <div className="create-account-text">
          <p>Not an user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
