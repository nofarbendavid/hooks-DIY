import React from "react";
import ReactDOM from "react-dom";
import { isUndefined, noop } from "lodash";
import App from "./App";
import "./index.css";

const HOOKS = [];
let currentPointer = -1;

export const useState = initialState => {
  const index = ++currentPointer;

  if (HOOKS[index]) {
    return HOOKS[index];
  }

  const setState = newState => {
    HOOKS[index][0] = newState;
    customRender();
  };

  const nextState = [initialState, setState];
  HOOKS[index] = nextState;

  return nextState;
};

export const useEffect = (callback, dependenciesArray) => {
  const index = ++currentPointer;

  const prevDependencies = HOOKS[index];

  const isSimilar =
    prevDependencies &&
    prevDependencies.dependencies.every((item, index) =>
      Object.is(item, dependenciesArray[index])
    );

  if (isUndefined(dependenciesArray) || !isSimilar) {
    prevDependencies && prevDependencies.cleanUp();
    const cleanUpEffect = callback() || noop();
    HOOKS[index] = {
      dependencies: dependenciesArray,
      cleanUp: cleanUpEffect
    };
  }
};

export const customRender = () => {
  currentPointer = -1;
  ReactDOM.render(<App />, document.getElementById("root"));
};

customRender();

export const customUnmount = () => {
  HOOKS.forEach(({ cleanUp }) => cleanUp && cleanUp());

  HOOKS.length = 0;
  currentPointer = -1;

  document.getElementById("root").innerHTML = "";
};
