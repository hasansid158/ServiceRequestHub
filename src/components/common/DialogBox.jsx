import React from 'react'

import { Dialog, Box, Typography, IconButton, Divider } from '@mui/material'
import { Close } from '@mui/icons-material'

const DialogBox = ({
  children,
  title = '',
  onClose,
  sx,
  ...rest
}) => {
  return (
    <Dialog
      {...rest}
      onClose={onClose}
      fullWidth
    >
      <Box sx={{ py: 2, px: 3, width: '100%' }}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Typography variant='h6' fontWeight={600}>{title}</Typography>
          {onClose && <IconButton onClick={onClose} color='primary' size='small'><Close /></IconButton>}
        </Box>
        <Divider />
        {children}
      </Box>
    </Dialog>
  )
}

export default DialogBox;