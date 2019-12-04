import React from 'react';
import logo from './images/logos/logo-grey.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Metrics & Insights for Modern Engineering Teams.
        </p>
        <a
          className="App-link"
          href="https://athenian.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          athenian.co
        </a>
      </header>
    </div>
  );
}

export default App;
