import React, { useState, useEffect } from 'react';

import logo from './images/logos/logo-transparent.png';

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

const pipeline = [
  {title: 'PR created', color: '#FF7D3A'},
  {title: 'Work in progress', color: '#FA1D62'},
  {title: 'first review', color: '#62C2DF'},
  {title: 'approval', color: '#9460DA'},
  {title: 'PR merged', color: '#FF7D3A'},
  {title: 'release', color: '#62C2DF'},
];

const wipStage = [
  {title: 'Time to Commit in Base Branch', color: '#62C2DF'},
  {title: 'Time to Release', color: '#FA1D62'},
  {title: 'Merged Pull Request', color: '#FF7D3A'},
];

export default function() {
  const [pipelineData] = useState(getData());
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
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="container">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} className="app-logo" alt="athenian" />
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">UserName</span>
                <img className="img-profile rounded-circle" alt="" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#login" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">

        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Lead Time</h1>
        </div>

        <div className="row mb-4">
          { pipeline.map((card, i) =>
            <div className="col-md-2" key={ i }>
              <div className="card shadow py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-uppercase mb-1">{ card.title }</div>
                      <div className="row no-gutters align-items-center">
                        <Example data={ pipelineData } color={ card.color } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) }
        </div>

        <div className="row mb-4">
          { wipStage.map((card, i) =>
            <div className="col-lg-4" key={ i }>
              <div className="card shadow">
                <div className="card-header">
                { card.title }
                </div>
                <div className="card-body">
                  <ExampleCustomized data={ data } color={ card.color } />
                </div>
              </div>
            </div>
          ) }
        </div>

      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Athenian.co 2020</span>
          </div>
        </div>
      </footer>

    </React.StrictMode>
  );
}
