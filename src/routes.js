import React from "react";
import Food from "./Food";
import Home from "./Home";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/:query/:key">
          <Food />
        </Route>
        <Route path="*">
          <h1>Essa rota não existe</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
