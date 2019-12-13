import React from 'react';
import logo from './images/logos/logo-grey.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="row app-header">
        <div className="page">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} className="app-logo" alt="athenian" />
          </a>
        </div>
      </header>
      <header className="row">
        <h1 className="page mainTitle">Lead Time</h1>
      </header>
      <article className="row">
        <div className="page">
          <div>Chart 1</div>
        </div>
        <div className="page">
          <div>Chart 2</div>
        </div>
      </article>
    </div>
  );
}

export default App;
