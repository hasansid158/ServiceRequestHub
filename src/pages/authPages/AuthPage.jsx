import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import { Typography, Box, Paper, Divider } from '@mui/material';

import { useFetchS3 } from '../../hooks/useFetchS3';

import { useLocation, useNavigate } from "react-router-dom";
import { routeMap } from '../../components/routes/routeMap';

import { useAuth } from '../../components/auth/AuthProvider';

export const AuthPage = () => {
  const logoUrl = useFetchS3('assets/logo.png');
  const { user } = useAuth();

  const nav = useNavigate();

  const location = useLocation();

  const isLoginPage = location.pathname?.includes(routeMap.LOGIN);

  useEffect(() => {
    !!user && nav(routeMap.DASHBOARD);
  }, [user])


  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      my={3}
      mt={5}
    >
      <Paper
        elevation={1}
        sx={{
          py: 3,
          px: { xs: 2, sm: 4 },
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {logoUrl &&
          <Box
            component='img'
            src={logoUrl}
            alt='Service Request Hub'
            sx={{ width: '100%', maxWidth: '320px', height: 'auto' }}
          />
        }

        <Box mt={2} width='100%'>
          <Typography textAlign='center' variant='h3'>{isLoginPage ? 'Login' : 'Sign-up'}</Typography>
          <Divider sx={{ my: 2 }} />

          {isLoginPage ? <LoginForm /> : <SignupForm />}
        </Box>
      </Paper>
    </Box>
  )
}
