import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';


function App() {
  return (
    <div>
      {/*
      This is the router setup.
      When the url changes to one of below routes, the page is
      rerendered.

      It is advised to put new pages on top of the code.
      */}
      <Router>
        <Switch>
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
