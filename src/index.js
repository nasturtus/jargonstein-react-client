import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "../src/Components/AppRouter";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
  document.getElementById("root")
);
