import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

function App() {

  const[backendStatus ,setBackendStatus] = useState("Connection");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/health`)
    .then((res) => res.json())
    .then((data) => {
      if(data.status === 'ok'){
        setBackendStatus ("connected to backend");
      }else {
        setBackendStatus("error in connection")
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <p>{backendStatus}</p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
