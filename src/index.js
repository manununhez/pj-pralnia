import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Index from "./components/Index.js";
import BargainResult from "./components/BargainResult.js";
import Experiment from "./components/Tasks/Index.js";

ReactDOM.render(
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />
      <Route path="/results" exact render={props => <BargainResult {...props} />} />
      <Route path="/version/:version" exact render={props => <Experiment {...props} />} />
      <Route path="/task" exact render={props => <Experiment {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
