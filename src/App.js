import React from 'react';

import logo from './images/logos/logo-transparent.png';

import Pipeline from './components/pipeline/Pipeline';

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

const sampleCharts = [
  {
    title: 'Time to Commit in Base Branch',
    color: '#62C2DF',
    insights: [
      {title: "insight 1", value: "foobar 1"},
      {title: "insight 2", value: "foobar 2"}
    ]
  },
  {
    title: 'Time to Release',
    color: '#FA1D62',
    insights: [
      {title: "insight 3", value: "foobar 3"}
    ]
  },
  {
    title: 'Merged Pull Request',
    color: '#FF7D3A',
    insights: []
  },
];

const pipeline = [
  {
    tab: {title: 'PR created', color: '#FF7D3A'},
    body: {charts: sampleCharts}
  },
  {
    tab: {title: 'Work in progress', color: '#FA1D62'},
    body: {charts: sampleCharts}
  },
  {
    tab: {title: 'first review', color: '#62C2DF'},
    body: {charts: sampleCharts}
  },
  {
    tab: {title: 'approval', color: '#9460DA'},
    body: {charts: sampleCharts}
  },
  {
    tab: {title: 'PR merged', color: '#FF7D3A'},
    body: {charts: sampleCharts}
  },
  {
    tab: {title: 'release', color: '#62C2DF'},
    body: {charts: sampleCharts}
  },
];


export default function() {

  const data = pipeline.map((stage, i) => {
    return {
      tab: {...stage.tab, data: getData()},
      body: {charts: stage.body.charts.map(c => {
        return {...c, title:c.title + ' ' + i, data: getData()}
      }) }
    }
  });

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

        <Pipeline pipeline={ data }></Pipeline>

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
