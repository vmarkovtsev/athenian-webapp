import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Page from './templates/Page';

import { useUserContext } from 'js/context/User';

import logo from 'images/logos/logo-transparent.svg';

export const FROM_REGISTRATION = 'registration';

export default () => {
  const location = useLocation();
  const userContext = useUserContext();
  const [ghAppOpenedState, setGhAppOpenedState] = useState(false);
  const [ghAppOpenErrorState, setGhAppOpeneErrorState] = useState(false);

  const ghAppUrl = window.ENV.application.githubAppUri;

  const isAdmin = userContext?.defaultAccount?.isAdmin;
  const autoOpen = location.state?.origin == FROM_REGISTRATION;

  useEffect(() => {
    if (!isAdmin || !autoOpen || ghAppOpenedState) {
      return;
    }

    const timer = setTimeout(() => {
      openGhApp(ghAppUrl, () => setGhAppOpenedState(true), () => setGhAppOpeneErrorState(true))
    }, 5000);

    return () => clearTimeout(timer);
  }, [ghAppOpenedState, isAdmin, autoOpen, ghAppUrl]);

  if (!isAdmin) {
    return (
      <Slide
        title="Welcome to Athenian"
        text={<Link to="/stage/overview" className="btn btn-large btn-orange">Get the insights</Link>}
      >
        <Welcome />
      </Slide>
    )
  }

  if (!autoOpen) {
    return (
      <Slide
        title="Welcome to Athenian"
        text={<Link to="/stage/overview" className="btn btn-large btn-orange">Get the insights</Link>}
        footer={<>To install and configure the GitHub application, open <GhAppLink url={ghAppUrl} /></>}
      >
        <Welcome />
      </Slide>
    );
  }

  if (ghAppOpenErrorState) {
    return (
      <Slide
        title="Install Athenian GitHub Application"
        text={
          <>
            <div>
              Please, install and configure the Athenian GitHub application
              at <GhAppLink url={ghAppUrl} onClick={() => { setGhAppOpeneErrorState(false); setGhAppOpenedState(true); }} />
            </div>
            <div className="mt-2">
              Once you install and configure the GitHub App, Athenian will start loading your data from GitHub. The loading process will take a while.
            </div>
          </>
        }
        footer="The Athenian GitHub application could not be automatically opened"
      />
    );
  }

  if (!ghAppOpenedState) {
    return (
      <Slide
        title="Install Athenian GitHub Application"
        text={
          <>
            Another tab is going to be opened to install and configure the GitHub application
            if it doesn’t, please open <GhAppLink url={ghAppUrl} onClick={() => setGhAppOpenedState(true)} />
          </>
        }
      />
    );
  }

  return (
    <Slide
      title="Welcome to Athenian"
      text="Please wait while we are fetching your data…"
      footer={<>Install and configure the GitHub application in the recently opened tab, or through <GhAppLink url={ghAppUrl} /></>}
    >
      <Welcome />
    </Slide>
  );
};

const openGhApp = (url, onOpen, onError) => {
  const ghAppWindow = window.open(url, '_blank');
  if (!ghAppWindow?.focus) {
    onError();
    return;
  }

  try {
    ghAppWindow.focus();
    onOpen();
  } catch (e) {
    console.error(e);
    onError();
  }
}

const GhAppLink = ({ url, ...rest }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>{url}</a>
);

const Slide = ({ title, text, footer, children }) => {
  return (
    <Page>
      <div className="row h-100">
        <div className="col-12 my-auto">
          <div className="mt-3 mb-5 text-center">
            <img src={logo} alt="" width="200" />
          </div>
          <div className="col-8 offset-2 mb-5">
            <div className="card waiting py-5">
              <div className="card-body py-5">
                <div className="row">
                  <div className="col">
                    <h2 className="h1 text-dark font-weight-normal mt-5 mb-2 pl-4">{title}</h2>
                    <p className="h4 text-secondary font-weight-light pl-4 mb-5">{text}</p>
                    {children}
                  </div>
                </div>
              </div>
            </div>
            {footer && (
              <div>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

const Welcome = () => {
  return (
    <div className="pl-4">
      <ul className="m-0 p-0">
        <li className="waiting-container mb-1">
          <div className="waiting-chart">
            <span className="waiting-box"></span>
          </div>
        </li>
        <li className="waiting-container mb-1">
          <div className="waiting-table">
            <span className="waiting-box"></span>
          </div>
        </li>
        <li className="waiting-container mb-1">
          <div className="waiting-table">
            <span className="waiting-box"></span>
          </div>
        </li>
        <li className="waiting-container mb-1">
          <div className="waiting-table">
            <span className="waiting-box"></span>
          </div>
        </li>
      </ul>
    </div>
  );
};
