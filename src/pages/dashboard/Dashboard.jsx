import React, { useEffect } from 'react'

import { fetchServicesApi } from '../../api/serviceRequestApi'

import { Dialog, Box, Typography, IconButton, Divider, Button } from '@mui/material'
import { Add } from '@mui/icons-material';

import ServiceFormDialog from './ServiceFormDialog';

export const Dashboard = () => {
  useEffect(() => {
    fetchServicesApi().then(res => console.log(res))
  }, [])


  return <>
    <Box pt={3} pb={1}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h3'>Dashboard</Typography>
        <Button variant='contained' sx={{ minWidth: '150px' }} color='secondary' startIcon={<Add />}>Create</Button>
      </Box>


    </Box>

    <ServiceFormDialog />
  </>
}
