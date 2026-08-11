import { createBrowserRouter, RouteObject, useLocation } from 'react-router-dom';
import App from '../App';
import { DiscoverPage, BotsPage, PositionsPage, SettingsPage, ConfigEndpointPage } from '../pages';
import { LoginPage } from '../pages/LoginPage';
import OAuthCallbackPage from '../pages/OAuthCallbackPage';

/**
 * The configured Deriv OAuth redirect URI is the production root:
 * https://optafx.site
 *
 * Deriv therefore returns the authorization code to `/`, not `/oauth/callback`.
 * This wrapper detects an OAuth response at the root and hands it to the same
 * callback handler used by the dedicated callback route.
 */
function RootRoute() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const isOAuthCallback =
    params.has('code') ||
    params.has('state') ||
    params.has('error');

  return isOAuthCallback ? <OAuthCallbackPage /> : <App />;
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootRoute />,
    children: [
      { path: '', element: <DiscoverPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'bots', element: <BotsPage /> },
      { path: 'positions', element: <PositionsPage /> },
      { path: 'menu', element: <SettingsPage /> },
    ],
  },
  { path: '/endpoint', element: <ConfigEndpointPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/oauth/callback', element: <OAuthCallbackPage /> },
];

export const router = createBrowserRouter(routes);

export const pathToTab: Record<string, string> = {
  '/': 'discover',
  '/discover': 'discover',
  '/bots': 'bots',
  '/positions': 'positions',
  '/menu': 'menu',
  '/login': 'login',
  '/oauth/callback': 'login',
};

export const tabToPath: Record<string, string> = {
  discover: '/discover',
  bots: '/bots',
  positions: '/positions',
  menu: '/menu',
  login: '/login',
};
