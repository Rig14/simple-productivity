import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import Close from '../assets/icons/close-icon.svg';
import Email from '../assets/icons/email.svg';
import Password from '../assets/icons/padlock.svg';
import RightArrow from '../assets/icons/right-arrow.svg';

const Login = (): JSX.Element => {
  // both inputs refrence
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // bottom forgot password states
  const [forgotPasswordForm, setForgotPasswordForm] = useState<boolean>(false);
  const forgotPasswordRef = useRef<HTMLInputElement>(null);
  const [forgotPasswordMessage, setForgotPasswordMessage] =
    useState<JSX.Element>(<></>);
  // error message
  const [error, setError] = useState(<></>);
  // used for conditionally disabling login button to avoid double signin
  const [loginButton, setLoginButton] = useState(true);
  let button: JSX.Element;
  // used for pushing user back after login
  const history = useHistory();

  // dont know the type of that "e"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = (e: any) => {
    if (
      emailRef?.current?.value != null &&
      passwordRef?.current?.value != null
    ) {
      e.preventDefault();
      // disables the login button
      setLoginButton(false);
      auth
        // signing in with the entered data
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        // if succesfull pushes user back
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          // all error codes
          const wrongPassword = 'auth/wrong-password';
          const wrongEmail = 'auth/user-not-found';
          const invalidEmail = 'auth/invalid-email';
          const tooManyRequests = 'auth/too-many-requests';

          const errorCode = err.code;

          // setting error message for every error code
          switch (errorCode) {
            case wrongEmail:
              setError(
                <p>Your email and password do not match. Please try again.</p>
              );
              break;
            case wrongPassword:
              setError(<p>Your password does not match. Please try again.</p>);
              break;
            case invalidEmail:
              setError(<p>Email is not valid.</p>);
              break;
            case tooManyRequests:
              setError(
                <p>
                  Access to this account has been temporarily disabled due to
                  many failed login attempts.
                </p>
              );
              break;
            default:
              setError(<p>Something went wrong. Please try again.</p>);
          }
          const emailLength = emailRef.current?.value.length;
          const passwordLength = passwordRef.current?.value.length;

          // special cases to render more specific error message
          if (emailLength === 0 && passwordLength === 0) {
            setError(<p>Please enter your email and password</p>);
          } else if (emailLength === 0) {
            setError(<p>Email required</p>);
          } else if (passwordLength === 0) {
            setError(<p>Password required</p>);
          }

          // re enables the button
          setLoginButton(true);
        });
    }
  };

  const back = () => {
    history.push('/');
  };

  // if user is logged in and tries to view this
  // component then push user back
  useEffect(() => {
    if (auth.currentUser?.uid != null) {
      back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loginButton) {
    // enabled button
    button = (
      <button onClick={login} className="form-button" type="submit">
        Log in
      </button>
    );
  } else {
    // disabled button
    button = (
      <button
        onClick={login}
        disabled
        className="form-button-disabled"
        type="submit"
      >
        Log in
      </button>
    );
  }

  let forgotPasswordInput: JSX.Element = (
    <>
      <button
        className="forgot-password-button"
        type="button"
        onClick={() => setForgotPasswordForm(true)}
      >
        Forgot your password?
      </button>
    </>
  );

  const submitForgottenPasswordEmail = () => {
    // sending the user an email to reset password

    const email = forgotPasswordRef.current?.value;

    if (email !== undefined) {
      auth
        // sending email to the specified location
        .sendPasswordResetEmail(email)
        // if everything goes according to plan
        .then(() => setForgotPasswordMessage(<p>Success!</p>))
        .catch((err) => {
          // setting error messages
          const userNotFound = 'auth/user-not-found';
          const badFormat = 'auth/invalid-email';

          const { code } = err;

          switch (code) {
            case userNotFound:
              setForgotPasswordMessage(<p>User was not found</p>);
              break;
            case badFormat:
              setForgotPasswordMessage(<p>Email is not valid</p>);
              break;
            default:
              setForgotPasswordMessage(
                <p>Something went wrong. Please try again</p>
              );
          }
        });
    }
  };

  if (forgotPasswordForm) {
    forgotPasswordInput = (
      <div className="forgot-password">
        <h3>Reset your password </h3>
        <p>
          Tell us the email address associated with your account, and we’ll send
          you an email with a link to reset your password.
        </p>
        <div className="submit-email-div">
          <input
            className="forgot-password-input"
            type="text"
            ref={forgotPasswordRef}
            placeholder="enter your email..."
          />
          <button
            type="submit"
            className="forgot-password-input submit-email"
            onClick={submitForgottenPasswordEmail}
          >
            <img src={RightArrow} alt="submitEmail" />
          </button>
        </div>
        <div className="forgot-password-message">{forgotPasswordMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg">
      <div className="form-box">
        <div className="button-div">
          <h1>Login</h1>
          <button onClick={back} className="go-back" type="button">
            <img src={Close} alt="close" />
          </button>
        </div>
        <div className="input-container">
          <div>
            <img src={Email} alt="email" />
            <input
              type="email"
              ref={emailRef}
              placeholder="Email..."
              className="email-box"
            />
          </div>
          <div>
            <img src={Password} alt="password" />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password..."
              className="password-box"
            />
          </div>
        </div>
        <div className="error-div">{error}</div>

        {button}

        <div className="login-bottom-text">
          <p>
            Not an user? <Link to="/signup">Create an account</Link>
          </p>
        </div>
        <div className="login-bottom-text">{forgotPasswordInput}</div>
      </div>
    </div>
  );
};

export default Login;
