import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isUserLoggedIn } from "Utils/common";

import Login from "./containers/login";
import Signup from "./containers/signup";


const Auth = () => {
  if (isUserLoggedIn()) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/create-account" component={Signup} />
      </Switch>
    </div>
  );
};

export default Auth;
