import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={"/signin"}>
            <SignIn &>
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
