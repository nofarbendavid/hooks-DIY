import React from 'react';
import {isEmpty} from 'lodash';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const STATE = [];
let currentStatePointer = -1;

const DEPENDENCIES = [];
let currentDependenciesPointer = -1;

export const useState = (initialState) => {
  const currentPointer = ++currentStatePointer;

  if(STATE[currentPointer]){
    return STATE[currentPointer]
  }

  const setState = (newState) => {
    STATE[currentPointer][0] = newState;
    customRender()
  };

  const nextState =  [initialState, setState];
  STATE[currentPointer] = nextState;

  return nextState;
}

export const useEffect = (callback, dependenciesArray) => {
  const currentPointer = ++currentDependenciesPointer;
  const prevDependencies = DEPENDENCIES[currentPointer];
  const isSimilar = prevDependencies && prevDependencies.every((dep, index)=> dep === dependenciesArray[index]);

  if(isEmpty(dependenciesArray) || !isSimilar){
    callback();
    DEPENDENCIES[currentPointer] = dependenciesArray;
  }
}

export const customRender = () => {
  currentStatePointer = -1;
  currentDependenciesPointer = -1;
  ReactDOM.render(<App />, document.getElementById('root'));
}

customRender();

