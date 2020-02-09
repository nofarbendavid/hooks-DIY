import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const STATE = [];
let currentStatePointer = -1;

export const useState = initialState => {
  const index = ++currentStatePointer;

  if (STATE[index]) {
    return STATE[index];
  }

  const setState = newState => {
    STATE[index][0] = newState;
    customRender();
  };

  const nextState = [initialState, setState];
  STATE[index] = nextState;

  return nextState;
};

export const customRender = () => {
  currentStatePointer = -1;
  ReactDOM.render(<App />, document.getElementById("root"));
};

customRender();
