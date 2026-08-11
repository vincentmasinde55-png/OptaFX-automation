/**
 * OptaFX application entry point.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { router } from './router';
import { OptaFXLoader } from './components/OptaFXLoader';
import './styles/index.scss';
import './styles/global.scss';

function Root() {
  return (
    <>
      <OptaFXLoader />
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
