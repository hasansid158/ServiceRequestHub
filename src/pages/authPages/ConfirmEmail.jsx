import React, { useState } from 'react'

import { Box, Typography, Divider, Grid2, Button } from '@mui/material'

import { TextInput } from '../../components/input/TextInput'
import useReactForm from '../../hooks/useHookForm'

import { useAuth } from '../../components/auth/AuthProvider'

const ConfirmEmail = ({ username = '' }) => {
  const { confirmSignUp } = useAuth();
  const { formObj, handleSubmit } = useReactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async (data) => {
    setError('');
    setIsLoading(true);
    confirmSignUp({ ...data, username })
      .catch(() => setError('Invalid code entered!'))
      .finally(() => setIsLoading(false));
  }

  return (
    <Box mt={1} width='100%'>
      <Box my={2}>
        <Typography>Please check your email for confirmation code.</Typography>
      </Box>

      <TextInput
        name='confirmationCode'
        label='Code'
        required
        fullWidth
        formObj={formObj}
      />

      {error && <Typography sx={{ my: 1 }} color='error' variant='body2'>{error}</Typography>}

      <Box mt={2}>
        <Button
          variant='contained'
          fullWidth
          onClick={() => handleSubmit(handleClick)()}
          loading={isLoading}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default ConfirmEmail