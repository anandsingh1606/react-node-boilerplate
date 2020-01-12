import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/landing";

const Home = () => (
  <div>
    <Switch>
      <Route path="/" component={Landing} />
    </Switch>
  </div>
);

export default Home;
