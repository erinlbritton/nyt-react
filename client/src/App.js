import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Nav from "./components/Nav";

const App = () => (
    <div>
      <Nav />
      <Articles />
    </div>
);

export default App;
