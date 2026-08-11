import { Button, Space } from "antd";
import "./styles.scss";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  accountType?: string;
  balance?: string;
  currency?: string;
  onDepositClick?: () => void;
}

const OptaFXLogo = () => (
  <img src="/optafx-logo.svg" alt="OptaFX" className="app-header__logo" />
);

export function Header({ isLoggedIn = false, onLogin, accountType, balance, currency, onDepositClick }: HeaderProps) {
  return (
    <header className="app-header">
      {!isLoggedIn ? (
        <>
          <div className="app-header__logo-section"><OptaFXLogo /></div>
          <Space>{onLogin && <Button type="default" onClick={onLogin} className="app-header__deposit-btn">Log in</Button>}</Space>
        </>
      ) : (
        <>
          <div className="app-header__user-section">
            <div className="app-header__logo-section"><OptaFXLogo /></div>
            <div className="app-header__account-info">
              <div className="app-header__account-type">{accountType}</div>
              <div className="app-header__account-balance">{balance} {currency}</div>
            </div>
          </div>
          <Space>{onDepositClick && <Button type="default" className="app-header__deposit-btn" onClick={onDepositClick}>Deposit</Button>}</Space>
        </>
      )}
    </header>
  );
}
