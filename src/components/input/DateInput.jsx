import React from 'react'

import { Controller } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

import { isValid } from 'date-fns';

export const DateInput = ({
  formObj = {},
  name = '',
  label = '',
  required,
  fullWidth,
  textFieldProps = {},
  ...rest
}) => {

  return (
    <Controller
      control={formObj?.control}
      name={name}
      rules={{
        required,
      }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker 
            {...field}
            {...rest} 
            value={field?.value || null}
            label={label} 
            format='dd/MM/yyyy'
            slotProps={{
              textField: (pickerParams) => ({
                fullWidth,
                ...pickerParams,
                ...textFieldProps,
                error: !!formObj?.errors[name],
                helperText: (
                  !!formObj?.errors[name] &&
                  (formObj?.errors[name]?.message || `${label || name} is required`)
                )
              }),
            }}
            slots={{
              textField: TextField,
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
