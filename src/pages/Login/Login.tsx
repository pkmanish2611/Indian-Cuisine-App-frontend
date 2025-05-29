import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack, TextField, PrimaryButton, Text, MessageBar, MessageBarType } from '@fluentui/react';
import { useAppDispatch } from '../../store/hook';
import { loginStart, loginSuccess, loginFailure } from '../../store/authSlice';
import { login } from '../../api/auth';
import './Login.css';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      const user = await login({ username, password });
      dispatch(loginSuccess(user));
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Text variant="xxLarge" className="login-title">
          Sign In
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack tokens={{ childrenGap: 15 }}>
            {error && (
              <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
                {error}
              </MessageBar>
            )}
            <TextField
              label="Username"
              value={username}
              onChange={(_, newValue) => setUsername(newValue || '')}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(_, newValue) => setPassword(newValue || '')}
              required
              canRevealPassword
            />
            <PrimaryButton
              type="submit"
              text={loading ? 'Signing In...' : 'Sign In'}
              disabled={loading}
              className="login-button"
            />
          </Stack>
        </form>
      </div>
    </div>
  );
};