import React, { useState, useEffect } from 'react';

import './App.css';
import '../node_modules/react-vis/dist/style.css';

import logo from './images/logos/logo-grey.png';

import Example from './components/charts/Example';
import ExampleCustomized from './components/charts/ExampleCustomized';

const getData = () => [
  {x: 0, y: 10*Math.random()},
  {x: 1, y: 10*Math.random()},
  {x: 2, y: 10*Math.random()},
  {x: 3, y: 10*Math.random()},
  {x: 4, y: 10*Math.random()},
  {x: 5, y: 10*Math.random()},
  {x: 6, y: 10*Math.random()},
  {x: 7, y: 10*Math.random()},
  {x: 8, y: 10*Math.random()},
  {x: 9, y: 10*Math.random()}
];

const addNew = data => data.map((_, i) => {
  return {
    x: i,
    y: data[i+1] ? data[i+1]['y'] : 10*Math.random()
  };
});

export default function() {
  const [data, setData] = useState(getData());

  useEffect(() => {
    const updater = window.setInterval(() => {
      setData(old => addNew(old));
    }, 1000);

    return () => {
      window.clearInterval(updater);
    }
  }, []);

  return (
    <React.StrictMode>
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
            <Example data={ data } />
            <Example data={ data } pattern="true" />
          </div>
          <div className="page">
            <ExampleCustomized data={ data } />
          </div>
        </article>
      </div>
    </React.StrictMode>
  );
}
