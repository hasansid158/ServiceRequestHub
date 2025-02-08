import React from 'react'

import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

export const TextInput = ({
  formObj,
  name = '',
  rules,
  label = '',
  required,
  type,
  ...rest
}) => {

  const getEmailValidationRules = () => ({
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Invalid email format',
    },
  });

  if (!formObj) return (
    <TextField name={name} label={label} required={required} type={type} {...rest} />
  )

  return (
    <Controller
      control={formObj?.control}
      name={name}
      rules={{
        required: required,
        ...(type === 'email' ? getEmailValidationRules() : {}),
        ...rules,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          type={type}
          value={field?.value || ''}
          label={label}
          error={!!formObj?.errors[name]}
          helperText={
            !!formObj?.errors[name] &&
            (formObj?.errors[name]?.message || `${label || name} is required`)
          }
        />
      )}
    />
  )
}
