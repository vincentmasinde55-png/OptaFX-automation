import { useEffect, useState } from 'react';
import { Alert, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { oauthService } from '../services/oauth/oauthService';

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    oauthService.handleCallback()
      .then(() => navigate('/', { replace: true }))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Deriv login failed.'));
  }, [navigate]);

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#031a3b', color: '#e8f4ff', padding: 24 }}>
      <div style={{ width: 'min(440px, 100%)', textAlign: 'center' }}>
        {error ? <Alert type="error" showIcon message="Deriv connection failed" description={error} /> : <><Spin size="large" /><Typography.Paragraph style={{ color: '#e8f4ff', marginTop: 20 }}>Connecting your Deriv account to OptaFX…</Typography.Paragraph></>}
      </div>
    </main>
  );
}
