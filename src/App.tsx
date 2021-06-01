import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';


function App() {
  const [user, setUser] = useState<{uid: null | string | undefined, email: null | string | undefined}>({ uid: null, email: null })
  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(userAuth => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email
      }
      if (userAuth) {
        setUser(user)
      } else {
        setUser({uid: null, email: null})
      }
    })
    return unsubscribe
  }, [])

  const logout = () => {
    auth.signOut(); 
  }
  const y = () => {
    console.log(auth.currentUser?.uid);
  }

  return (
    <div>
      {/*
      This is the router setup.
      When the url changes to one of below routes, the page is
      rerendered.

      It is advised to put new pages on top of the code.
      */}
      <button onClick={logout}>Sign out</button>
      <button onClick={y}>getuser</button>
      {user ? <h1>User is signed in</h1> : <h1>user is not signed in</h1>}
      <Router>
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/signup"}>
            <SignUp />
          </Route>
          {/*
          for example this renders the home page.
          */}
          <Route path={"/"}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
