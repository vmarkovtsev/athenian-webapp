import React from 'react';

import { Redirect } from 'react-router-dom';

import { Cookies } from 'react-cookie';

const DEMO_COOKIE_KEY = 'athenian.isDemo';
const DEMO_COOKIE_MAX_AGE = 60 * 60 * 1;

export const Demo = () => {
  setDemoCookie();
  return <Redirect to={'/'} />;
};

export const Undemo = () => {
  removeCookie();
  return <Redirect to={'/'} />;
};

export const refreshCookie = () => {
  if (isDemo()) {
    setDemoCookie();
  }
};

export const removeCookie = () => {
  const cookies = new Cookies();
  cookies.remove(DEMO_COOKIE_KEY);
};

export const isDemo = () => (new Cookies()).get(DEMO_COOKIE_KEY) === 'true';

const setDemoCookie = () => {
  const cookies = new Cookies();
  cookies.set(DEMO_COOKIE_KEY, true, {
    path: '/',
    maxAge: DEMO_COOKIE_MAX_AGE,
  });
};
