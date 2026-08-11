import { useEffect, useState } from 'react';
import '../styles/OptaFXLoader.scss';

export function OptaFXLoader() {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`opta-loader${leaving ? ' opta-loader--leaving' : ''}`} role="status" aria-label="Loading OptaFX">
      <div className="opta-loader__background" />
      <div className="opta-loader__overlay" />
      <div className="opta-loader__content">
        <div className="opta-loader__brand"><span>Opta</span><strong>FX</strong></div>
        <p>Your ultimate automated trading and trusted Deriv third party website</p>
        <div className="opta-loader__bar"><span /></div>
        <small>Loading secure trading environment</small>
      </div>
    </div>
  );
}
