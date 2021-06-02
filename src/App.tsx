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



  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/login"}>
            <Login />
          </Route>

          <Route path={"/signup"}>
            <SignUp />
          </Route>
          <Route path={"/"}>
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
