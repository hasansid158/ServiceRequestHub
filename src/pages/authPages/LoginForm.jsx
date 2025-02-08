import React, { useState } from 'react'

import { Typography, Grid2, Button } from '@mui/material'

import { TextInput } from '../../components/input/TextInput'
import useReactForm from '../../hooks/useHookForm'

import { useAuth } from '../../components/auth/AuthProvider'

import { Link } from 'react-router-dom'
import { routeMap } from '../../components/routes/routeMap'

const LoginForm = () => {
  const { login } = useAuth();
  const { formObj, handleSubmit } = useReactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    setError('');
    setIsLoading(true);
    login(data)
      .catch(() => setError('Invalid username or password'))
      .finally(() => setIsLoading(false));
  }


  return (
    <>
      <Grid2 container spacing={3} mt={4} maxWidth={350}>
        <Grid2 size={12}>
          <TextInput
            name='username'
            label='Username'
            required
            fullWidth
            formObj={formObj}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextInput
            name='password'
            label='Password'
            required
            fullWidth
            formObj={formObj}
            type='password'
          />
          {error && <Typography sx={{ my: 1 }} color='error' variant='body2'>{error}</Typography>}

          <Link to={routeMap.SIGNUP}><Typography sx={{ mt: 2 }} fontWeight={600}>Sign-up instead</Typography></Link>

        </Grid2>
        <Grid2 size={12}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => handleSubmit(handleLogin)()}
            loading={isLoading}
          >
            Login
          </Button>
        </Grid2>
      </Grid2>
    </>
  )
}

export default LoginForm