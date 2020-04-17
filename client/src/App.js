import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./containers/Signup";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import requireAuth from "./hoc/requireAuth";
import requireNoAuth from "./hoc/requireNoAuth";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={requireNoAuth(Signup)} />
          <Route path="/signin" component={requireNoAuth(SignIn)} />
          <Route path="/profile" component={requireAuth(Profile)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
