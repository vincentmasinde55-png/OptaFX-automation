import { Button, ConfigProvider, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { oauthService } from '../services/oauth/oauthService';
import '../styles/login.scss';

const { Title, Paragraph } = Typography;

export function LoginPage() {
  const { effectiveTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await oauthService.initiateLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfigProvider>
      <div className={`login-page ${effectiveTheme}`}>
        <div className="login-container">
          <div className="login-logo">
            <img src="/optafx-logo.svg" alt="OptaFX" />
          </div>
          <Title level={2} className="login-title">OptaFX</Title>
          <Paragraph>Your ultimate automated trading and trusted Deriv third party website</Paragraph>
          <Button type="primary" size="large" block onClick={handleLogin}>
            Log in with Deriv
          </Button>
          <Button type="link" block onClick={() => navigate('/')}>
            Continue to OptaFX
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}
