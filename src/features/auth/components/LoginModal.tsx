import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
  Divider,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { closeLoginModal, setIsGuest, loginUser, setError, registerUser } from '../../../features/auth/slice';
import { RootState } from '../../../store/store';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    background: #ffffff;
    width: 100%;
    max-width: 100%;
    margin: 0;
    height: auto;
    border-radius: 0;

    @media (min-width: 600px) {
      width: 600px;
      max-width: 600px;
      margin: 32px auto;
      height: auto;
      border-radius: 20px;
    }
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(135deg, #ff7043 30%, #ffa726 90%) !important;
  color: white !important;
  font-weight: bold;
  text-transform: none;
  border-radius: 30px;
  padding: 0.8rem;
  &:hover {
    background: linear-gradient(135deg, #ffa726 30%, #ff7043 90%) !important;
  }
  &:disabled {
    background: #e0e0e0 !important;
    color: #666 !important;
  }
`;

const OutlinedGuestButton = styled(Button)`
  border-radius: 30px;
  padding: 0.8rem;
  font-weight: 500;
`;

const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #ff7043;
    height: 4px;
  }
  .MuiTab-root {
    font-weight: bold;
  }
`;

const StyledDivider = styled(Divider)`
  width: 100%;
  color: #999;
`;

interface LoginModalProps {
  open: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const LoginModal = ({ open }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, loading, isGuest } = useAppSelector((state: RootState) => state.auth);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    clearError();
  };

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const handleLogin = async () => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return;
    }
    if (email && password) {
      dispatch(registerUser({ email, password }));
    }
  };

  const handleGuestAccess = () => {
    dispatch(setIsGuest(true));
    handleClose();
  };

  const emailOnChange = (value: string) => {
    setEmail(value);
    clearError();
  };

  const passwordOnChange = (value: string) => {
    setPassword(value);
    clearError();
  };

  const confirmPasswordOnChange = (value: string) => {
    setConfirmPassword(value);
    clearError();
  };

  const clearError = () => {
    if (error) {
      dispatch(setError(''));
    }
  };

  return (
    <StyledDialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ position: 'relative' }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="auth tabs"
          centered
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </StyledTabs>
        {isGuest && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        <TabPanel value={tabValue} index={0}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => emailOnChange(e.target.value)}
              required
              disabled={loading}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => passwordOnChange(e.target.value)}
              required
              disabled={loading}
            />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => emailOnChange(e.target.value)}
              required
              disabled={loading}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => passwordOnChange(e.target.value)}
              required
              disabled={loading}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => confirmPasswordOnChange(e.target.value)}
              required
              disabled={loading}
            />
          </Box>
        </TabPanel>
      </DialogContent>
      {error && (
        <Alert severity="error" sx={{ margin: '0 1rem !important', width: 'auto !important' }}>
          {error}
        </Alert>
      )}
      <DialogActions sx={{ flexDirection: 'column', gap: 1, p: 3 }}>
        {tabValue === 0 ? (
          <GradientButton
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Logging in...' : 'Login'}
          </GradientButton>
        ) : (
          <GradientButton
            variant="contained"
            fullWidth
            onClick={handleSignup}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </GradientButton>
        )}
        {!isGuest && (
          <>
            <StyledDivider sx={{ width: '100%', my: 1 }}>or</StyledDivider>
            <OutlinedGuestButton
              variant="outlined"
              fullWidth
              onClick={handleGuestAccess}
              disabled={loading}
            >
              Continue as Guest
            </OutlinedGuestButton>
          </>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default LoginModal; 