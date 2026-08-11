import { Link } from 'react-router-dom';
import './styles.scss';

const actions = [
  { title: 'Load Bot', description: 'Import an XML strategy from your device.', path: '/bots', tone: 'cyan', icon: '▰' },
  { title: 'Speed Bot', description: 'Build a guided strategy quickly.', path: '/bots', tone: 'green', icon: '↗' },
  { title: 'Load Auto Trader', description: 'Import an Auto Trader strategy from your device.', path: '/bots', tone: 'blue', icon: '⌁' },
  { title: 'Premium Bots', description: 'Explore advanced ready-made bots.', path: '/bots', tone: 'gold', icon: '♛' },
  { title: 'Free Bots', description: 'Browse free strategies to load and edit.', path: '/bots', tone: 'purple', icon: '▣' },
  { title: 'Analysis Tool', description: 'Study market information before opening trades.', path: '/positions', tone: 'red', icon: '⌁' },
];

export function StrategyList() {
  return (
    <div className="opta-dashboard">
      <section className="opta-hero">
        <h1>Hello Trader<span>!</span></h1>
        <p>💎 Patience is a trader&apos;s hidden advantage.</p>
      </section>
      <div className="opta-section-line" />
      <section className="opta-actions" aria-label="Trading tools">
        {actions.map((action) => (
          <Link key={action.title} to={action.path} className={`opta-action-card opta-action-card--${action.tone}`}>
            <span className="opta-action-card__icon">{action.icon}</span>
            <span className="opta-action-card__copy"><strong>{action.title}</strong><small>{action.description}</small></span>
            <span className="opta-action-card__arrow">-&gt;</span>
          </Link>
        ))}
      </section>
      <section className="opta-bot-status">
        <div><span className="opta-status-dot" /><strong>Bot control</strong><small>Ready to trade</small></div>
        <div className="opta-controls" aria-label="Bot controls">
          <Link to="/bots">▶ Start</Link><Link to="/bots">Ⅱ Pause</Link><Link to="/bots">↻ Resume</Link><Link to="/bots">■ Stop</Link>
        </div>
      </section>
      <section className="opta-testimonial">
        <h2>WHAT TRADERS ARE SAYING</h2>
        <div className="opta-quote">★★★★★<br /><em>“A clean place to build, test and manage automated trading strategies.”</em><br /><strong>OptaFX</strong></div>
      </section>
    </div>
  );
}
