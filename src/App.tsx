import { BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import React from "react";
import Router from "./Router";

const App = () => (
  <BrowserRouter>
    <Nav />
    <Router />
  </BrowserRouter>
);

export default App;
