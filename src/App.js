import React, {useEffect} from 'react';
import {NUMBER_FACT_MAP} from "./utils";
import {useState} from "./index";
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [funFact, setFunFact] = useState();


  useEffect(() => {
    document.title = `${count} clicks`;
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
    setFunFact(NUMBER_FACT_MAP[count+1]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>You clicked {count} times</h1>

          <button onClick={() => handleClick()}>Click me</button>

          <button onClick={() => {
            setCount(0);
            setFunFact(null);
          }}>Reset</button>

        </div>
      </header>
        {
          funFact &&
        <div>
          <h4 className="fact-container">Did you know that {count} {funFact}</h4>
          <button onClick={() => {setFunFact(null)}}>Clear</button>
        </div>
        }
    </div>
  );
};

export default App;
