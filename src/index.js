import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Count from "./Count";
import Loader from "./Loader";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Count />, document.getElementById("count"));
ReactDOM.render(<Loader />, document.getElementById("load"));
