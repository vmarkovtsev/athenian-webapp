import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Simple from './templates/Simple';

import { useUserContext } from 'js/context/User';

export default () => {
  const location = useLocation();
  const userContext = useUserContext();
  const [ghAppOpenedState, setGhAppOpenedState] = useState(false);
  const [ghAppOpenErrorState, setGhAppOpeneErrorState] = useState(false);

  const ghAppUrl = window.ENV.application.githubAppUri;

  useEffect(() => {
    if (!location.state?.ghAppAutoOpen) {
      return;
    }

    const timer = setTimeout(() => {
      !ghAppOpenedState && openGhApp(ghAppUrl, () => setGhAppOpenedState(true), () => setGhAppOpeneErrorState(true))
    }, 5000);

    return () => clearTimeout(timer);
  }, [ghAppOpenedState, location.state, ghAppUrl]);

  const isAdmin = userContext?.defaultAccount?.isAdmin;
  const autoOpen = location.state?.ghAppAutoOpen;

  if (!isAdmin) {
    return (
      <Simple linkToHome={false}>
        <Loading />
      </Simple>
    )
  }

  if (!autoOpen) {
    return (
      <Simple linkToHome={false}>
        <Loading />
        <div>To install and configure the GH application, open <GhAppLink url={ghAppUrl} /></div>
      </Simple>
    );
  }

  if (ghAppOpenErrorState) {
    return (
      <Simple linkToHome={false}>
        <div>Please, install and configure the Athenian GH application at <GhAppLink url={ghAppUrl} /></div>
        <WillLoad />
      </Simple>
    );
  }

  if (!ghAppOpenedState) {
    return (
      <Simple linkToHome={false}>
        <div>Another tab is going to be opened to install and configure the GH application;</div>
        <div>
          if it doesn’t, please open <GhAppLink url={ghAppUrl} onClick={() => setGhAppOpenedState(true)} />
        </div>
      </Simple>
    );
  }

  return (
    <Simple linkToHome={false}>
      <Loading />
      <div>You can install and configure the GH application in the recently opened tab.</div>
      <div>You can open it again <GhAppLink url={ghAppUrl} /></div>
    </Simple>
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

const Loading = () => {
  return (
    <div className="mb-2">We are loading your data from GitHub, this is going to take a while.</div>
  );
};

const WillLoad = () => {
  return (
    <div>Once you install and configure the GitHub App, Athenian will start loading your data from GitHub. The loading process will take a while.</div>
  );
};

const GhAppLink = ({ url, ...rest }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>{url}</a>
);
