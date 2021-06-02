import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../assets/logo.png'
import MenuIcon from '../assets/icons/menu-icon.svg'
import CloseIcon from '../assets/icons/close-icon.svg'
import { auth } from '../firebase'


const Navbar = () => {
  //menu control
  const [menuOpen, setMenuOpen] = useState(false);

  //checking if user is logged in. changes DOM accordingly 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(auth.currentUser?.uid != null);
  let logoutOrSignin: JSX.Element = <></>;
  let navigationMenu: JSX.Element = <></>;

  //is user signed in or not [input] field has the state of user. every time that state changes it runs
  useEffect(() => {
    if (auth.currentUser?.uid != null){
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [auth.currentUser?.uid]);


  const closeMenu = () => {
    setMenuOpen(false)
  }
  const openMenu = () => {
    setMenuOpen(true)
  }

  
  const logout = () => {
    auth.signOut(); 
    window.location.reload();
  }

  //changes the link to login if user is not logged in. otherwise it is a sign out button
  if (isUserLoggedIn) {
    logoutOrSignin = <button onClick={logout}>Sign out</button>;
  } else {
    logoutOrSignin = <Link to={"/login"}>Login</Link>;
  }

  //navigation menu
  if (menuOpen) {
    navigationMenu = 
    <div className="navigation-menu">
      <div className="nav-box">
        <div className="logo-icon-box">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="menu-button-box">
          <button onClick={closeMenu}>
            <img src={CloseIcon} alt="close" />
          </button>
        </div>
      </div>
      <div className="content">

        {/*
        changing button
        */}
        {logoutOrSignin}
      </div>
    </div>;
  } 

  return (
    <>

      {navigationMenu}
      {/*
      👆 when the navigation menu is opened renders that 
      */}
      <div className="nav-box">
        <div className="logo-icon-box">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="menu-button-box">
          <button onClick={openMenu}>
            <img src={MenuIcon} alt="menu" />
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
