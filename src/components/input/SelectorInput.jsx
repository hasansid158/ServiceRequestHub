import React from 'react'

import { MenuItem } from '@mui/material'
import { TextInput } from './TextInput'

const SelectorInput = ({
  selectorOptions = [],
  formObj,
  name = '',
  label = '',
  required,
  type,
  ...rest
}) => {

  if (!formObj) return (
    <TextInput select name={name} label={label} required={required} type={type} {...rest} />
  )

  return (
    <TextInput 
      select 
      formObj={formObj}
      name={name} 
      label={label} 
      required={required} 
      type={type} 
      {...rest} 
    >
      {selectorOptions.map((data, key) => (
        <MenuItem key={key} value={data?.value}>
          {data?.label}
        </MenuItem>
      ))}
    </TextInput>

  )
}

export default SelectorInput;
