import React from "react";
import ReactDOM from "react-dom";
import { isUndefined } from "lodash";
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
    prevDependencies.dependencies.every((item, index) =>
      Object.is(item, dependenciesArray[index])
    );

  if (isUndefined(dependenciesArray) || !isSimilar) {
    prevDependencies && prevDependencies.cleanUp();
    const cleanUpEffect = callback();
    DEPENDENCIES[index] = {
      dependencies: dependenciesArray,
      cleanUp: cleanUpEffect
    };
  }
};

export const customRender = () => {
  currentStatePointer = -1;
  currentDependenciesPointer = -1;
  ReactDOM.render(<App />, document.getElementById("root"));
};

customRender();

export const customUnmount = () => {
  DEPENDENCIES.forEach(({ cleanUp }) => cleanUp && cleanUp());

  DEPENDENCIES.length = 0;
  STATE.length = 0;
  currentStatePointer = -1;
  currentDependenciesPointer = -1;

  document.getElementById("root").innerHTML = "";
};
