import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import db, { auth } from '../firebase';

import Close from '../assets/icons/close-icon.svg';
import Email from '../assets/icons/email.svg';
import Password from '../assets/icons/padlock.svg';

const SignUp = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(<></>);
  const [signupButton, setSignupButton] = useState(true);
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signUp = (e: any) => {
    if (
      emailRef?.current?.value != null &&
      passwordRef?.current?.value != null
    ) {
      e.preventDefault();

      // disable the sign up button to avoid double sign up
      setSignupButton(false);

      // creating the account with email and password
      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((user) => {
          // setting up the initial data
          db.collection('users')
            .doc(user?.user?.uid)
            .set({
              // all the initial data that will be written into
              // firestore database.
              email: user.user?.email,
              todoItems: ['code', 'stay cool', 'have fun'],
              timer: 0,
              // count of all the todoitems done
              // will add a date later to group them by it
              todoItemsHistory: [],
              // stores data about the timer, will also have date later
              timerHistory: [],
            });

          // enables the button and redirects user to home page
          setSignupButton(true);
          history.push('/home');
        })
        .catch((err) => {
          setSignupButton(true);

          // possible error codes
          const invalidEmail = 'auth/invalid-email';
          const weakPassword = 'auth/weak-password';
          const emailExists = 'auth/email-already-exists';
          const emailInUse = 'auth/email-already-in-use';

          const errorCode = err.code;

          // creating an better error message for every error code
          switch (errorCode) {
            case invalidEmail:
              setError(
                <p>
                  The email you entered is not in the correct format. Please
                  check.
                </p>
              );
              break;
            case weakPassword:
              setError(<p>Password is too weak.</p>);
              break;
            case emailInUse:
            case emailExists:
              setError(<p>The provided email is already in use.</p>);
              break;
            default:
              setError(<p>Something went wrong. Please try again.</p>);
          }
        });
    }
  };

  const back = () => {
    history.goBack();
  };

  // if user is logged in and tries to view this
  // component then push user back
  if (auth.currentUser?.uid != null) {
    back();
  }

  let button = (
    <button onClick={signUp} type="submit">
      Create an account
    </button>
  );

  if (signupButton) {
    button = (
      <button onClick={signUp} className="form-button" type="submit">
        Create an account
      </button>
    );
  } else {
    button = (
      <button
        onClick={signUp}
        disabled
        className="form-button-disabled"
        type="button"
      >
        Create an account
      </button>
    );
  }

  return (
    <div className="bg">
      <div className="form-box">
        <div className="button-div">
          <button onClick={back} className="go-back" type="button">
            <img src={Close} alt="close" />
          </button>
        </div>
        <h1>Create an account</h1>
        <p className="signup-information">
          Gain access to additional features such as Graphs and Saves.
        </p>
        <div className="input-container">
          <div>
            <img src={Email} alt="email" />
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your email address..."
            />
          </div>
          <div>
            <img src={Password} alt="password" />
            <input
              type="password"
              ref={passwordRef}
              placeholder="Enter your password..."
            />
          </div>
        </div>
        <div className="error-div">{error}</div>
        {button}
      </div>
    </div>
  );
};

export default SignUp;
