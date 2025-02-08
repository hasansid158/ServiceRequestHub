import React, { useState } from 'react'

import { Box, Typography, Divider, Grid2, Button } from '@mui/material'

import { TextInput } from '../../components/input/TextInput'
import useReactForm from '../../hooks/useHookForm'

import { useAuth } from '../../components/auth/AuthProvider'

import { Link } from 'react-router-dom'
import { routeMap } from '../../components/routes/routeMap'

import ConfirmEmail from './ConfirmEmail'
import DialogBox from '../../components/common/DialogBox'

const SignupForm = () => {
  const { signUp } = useAuth();
  const { formObj, handleSubmit } = useReactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSignup = async (data) => {
    setError('');
    setIsLoading(true);
    signUp(data)
      .then(() => setConfirmOpen(true))
      .catch(() => setError('User already exists'))
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
            rules={{
              minLength: {
                value: 8,
                message: 'Minimum 8 characters required',
              },
            }}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextInput
            name='email'
            label='Email'
            type='email'
            required
            fullWidth
            formObj={formObj}
          />
          {error && <Typography sx={{ my: 1 }} color='error' variant='body2'>{error}</Typography>}

          <Link to={routeMap.LOGIN}><Typography sx={{ mt: 2 }} fontWeight={600}>Login instead</Typography></Link>
        </Grid2>
        <Grid2 size={12}>
          <Button
            variant='contained'
            fullWidth
            onClick={() => handleSubmit(handleSignup)()}
            loading={isLoading}
          >
            Signup
          </Button>
        </Grid2>
      </Grid2>

      <DialogBox open={confirmOpen} title='Confirmation Code' maxWidth='xs'>
        <ConfirmEmail username={formObj.getValues('username')} />
      </DialogBox>
    </>
  )
}

export default SignupForm