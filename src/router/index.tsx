import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import { DiscoverPage, BotsPage, PositionsPage, SettingsPage, ConfigEndpointPage } from '../pages';
import { LoginPage } from '../pages/LoginPage';
import OAuthCallbackPage from '../pages/OAuthCallbackPage';

export const routes: RouteObject[] = [
  { path: '/', element: <App />, children: [
    { path: '', element: <DiscoverPage /> },
    { path: 'discover', element: <DiscoverPage /> },
    { path: 'bots', element: <BotsPage /> },
    { path: 'positions', element: <PositionsPage /> },
    { path: 'menu', element: <SettingsPage /> },
  ] },
  { path: '/endpoint', element: <ConfigEndpointPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/oauth/callback', element: <OAuthCallbackPage /> },
];

export const router = createBrowserRouter(routes);

export const pathToTab: Record<string, string> = {
  '/': 'discover', '/discover': 'discover', '/bots': 'bots', '/positions': 'positions', '/menu': 'menu', '/login': 'login', '/oauth/callback': 'login',
};

export const tabToPath: Record<string, string> = {
  discover: '/discover', bots: '/bots', positions: '/positions', menu: '/menu', login: '/login',
};
