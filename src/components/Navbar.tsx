import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import Logo from '../assets/logo.png';

const Navbar = (): JSX.Element => {
  const [userAuth, setUserAuth] = useState<boolean>();

  useEffect(() => {
    if (auth.currentUser?.uid != null) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
    // there is no way that i can remove it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser?.uid]);

  const showLinks = (): JSX.Element => {
    // links when user is signed in
    if (userAuth === true) {
      return (
        <>
          <Link to="/todo">Todo</Link>
          <Link to="/pomodoro">Pomodoro</Link>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <Link to="/graphs">Graphs</Link>
          <Link to="account">Account</Link>
        </>
      );
    }

    // if user isnt signed in then shows this
    return (
      <>
        <Link to="/todo">Todo</Link>
        <Link to="/pomodoro">Pomodoro</Link>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <Link to="/graphs">Graphs</Link>
        <Link to="/login">Login</Link>
      </>
    );
  };

  // eslint-disable-next-line no-console
  console.log(showLinks);

  return (
    <>
      <div className="navbar">
        <div className="link-container">{showLinks()}</div>
      </div>
    </>
  );
};

export default Navbar;
