import React, { useEffect, useState } from "react";
import './App.css';
import Login from "./components/login";
import Dashboard from "./components/dashbard"
import { BrowserRouter, Route, Switch} from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route
          exact
          path="/"
          render={(props) => <Login />}
        />
        <Switch>
          <Route
            path="/Dashboard"
            render={(props) => <Dashboard {...props} />}
          />

        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
