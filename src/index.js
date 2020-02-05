import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const STATE = [];
let currentStatePointer = -1;

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



export const customRender = () => {
  currentStatePointer = -1;
  ReactDOM.render(<App />, document.getElementById('root'));
}

customRender();

