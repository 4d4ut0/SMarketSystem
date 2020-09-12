import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import DashBoard from "./Dashboard"
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/dashboard" component={DashBoard} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);


serviceWorker.unregister();
