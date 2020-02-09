import React from "react";
import { isUndefined } from "lodash";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const STATE = [];
let currentStatePointer = -1;

const DEPENDENCIES = [];
let currentDependenciesPointer = -1;

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

export const useEffect = (callback, dependenciesArray) => {
  const index = ++currentDependenciesPointer;

  const prevDependencies = DEPENDENCIES[index];
  const isSimilar =
    prevDependencies &&
    prevDependencies.every((dep, index) => dep === dependenciesArray[index]);

  if (isUndefined(dependenciesArray) || !isSimilar) {
    callback();
    DEPENDENCIES[index] = dependenciesArray;
  }
};

export const customRender = () => {
  currentStatePointer = -1;
  currentDependenciesPointer = -1;
  ReactDOM.render(<App />, document.getElementById("root"));
};

customRender();
