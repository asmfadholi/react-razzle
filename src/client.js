import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

hydrate(
  <BrowserRouter basename={getBasename()}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

console.log(process.env.RAZZLE_RUNTIME_DAMN, 'yasss');

if (module.hot) {
  module.hot.accept();
}
