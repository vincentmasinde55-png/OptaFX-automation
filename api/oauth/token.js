const DERIV_CLIENT_ID = '345tXaQ3o45OhOLPPqKES';
const DERIV_REDIRECT_URI = 'https://optafx.site';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  try {
    const { code, code_verifier, redirect_uri } = req.body || {};

    if (!code || !code_verifier) {
      return res.status(400).json({ error: 'missing_parameters' });
    }

    // Use the registered OptaFX OAuth client on the server. Do not trust a
    // client_id supplied by the browser and do not allow a different callback.
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: DERIV_CLIENT_ID,
      code,
      code_verifier,
      redirect_uri: redirect_uri || DERIV_REDIRECT_URI,
    });

    if (body.get('redirect_uri') !== DERIV_REDIRECT_URI) {
      return res.status(400).json({ error: 'invalid_redirect_uri' });
    }

    const response = await fetch('https://auth.deriv.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'token_exchange_failed' });
  }
}
