// Registered Deriv OAuth 2.0 client for OptaFX.
// Keep this exact client ID in the production build so a stale/mistyped
// Vercel environment variable cannot send an unknown client to Deriv.
const CLIENT_ID = '345tXaQ3o45OhOLPPqKES';
const REDIRECT_URI = 'https://optafx.site';
const SCOPE = 'trade';
const AUTH_ENDPOINT = 'https://auth.deriv.com/oauth2/auth';

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function createPkcePair() {
  const random = crypto.getRandomValues(new Uint8Array(64));
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const verifier = Array.from(random, byte => alphabet[byte % alphabet.length]).join('');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return { verifier, challenge: toBase64Url(new Uint8Array(digest)) };
}

class OAuthService {
  public async initiateLogin(): Promise<void> {
    const { verifier, challenge } = await createPkcePair();
    const stateBytes = crypto.getRandomValues(new Uint8Array(16));
    const state = toBase64Url(stateBytes);

    sessionStorage.setItem('optafx_pkce_verifier', verifier);
    sessionStorage.setItem('optafx_oauth_state', state);

    const url = new URL(AUTH_ENDPOINT);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', CLIENT_ID);
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('scope', SCOPE);
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge', challenge);
    url.searchParams.set('code_challenge_method', 'S256');

    window.location.assign(url.toString());
  }

  public async handleCallback(): Promise<Record<string, unknown>> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const error = params.get('error');

    if (error) {
      throw new Error(params.get('error_description') || error);
    }
    if (!code || !returnedState) {
      throw new Error('Deriv returned without an authorization code. Please restart login.');
    }

    const savedState = sessionStorage.getItem('optafx_oauth_state');
    const verifier = sessionStorage.getItem('optafx_pkce_verifier');

    if (!savedState || savedState !== returnedState) {
      throw new Error('OAuth state mismatch. Please restart login.');
    }
    if (!verifier) {
      throw new Error('PKCE verifier is missing. Please restart login.');
    }

    const response = await fetch('/api/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        code_verifier: verifier,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
      }),
    });

    let data: Record<string, any> = {};
    try {
      data = await response.json();
    } catch {
      throw new Error(`Deriv token exchange failed (${response.status}).`);
    }

    if (!response.ok || !data.access_token) {
      throw new Error(
        data?.error_description ||
        data?.error ||
        data?.errors?.[0]?.message ||
        `Deriv token exchange failed (${response.status}).`
      );
    }

    sessionStorage.removeItem('optafx_oauth_state');
    sessionStorage.removeItem('optafx_pkce_verifier');
    localStorage.setItem('optafx_access_token', data.access_token);
    if (data.refresh_token) localStorage.setItem('optafx_refresh_token', data.refresh_token);
    return data;
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('optafx_access_token');
  }

  public logout(): void {
    localStorage.removeItem('optafx_access_token');
    localStorage.removeItem('optafx_refresh_token');
    localStorage.removeItem('app_params');
    localStorage.removeItem('app_auth');
    window.location.assign('/');
  }
}

export const oauthService = new OAuthService();
