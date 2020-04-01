import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Count from "./components/Counter";
import Loader from "./components/Loader";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Count />, document.getElementById("count"));
ReactDOM.render(<Loader />, document.getElementById("load"));
