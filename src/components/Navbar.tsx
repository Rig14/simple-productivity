import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import Logo from '../assets/logo.png';

const Navbar = (): JSX.Element => {
  const showLinks = (): JSX.Element => {
    // links when user is signed in
    if (auth.currentUser !== null) {
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

  return (
    <>
      <div className="navbar">
        <div className="link-container">{showLinks()}</div>
      </div>
    </>
  );
};

export default Navbar;
