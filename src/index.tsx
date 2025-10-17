import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { worker } from "../mocks/worker";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  await worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
