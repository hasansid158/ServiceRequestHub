import React, { useEffect, useState } from 'react'

import { fetchServicesApi } from '../../api/serviceRequestApi'

import { Dialog, Box, Typography, IconButton, Divider, Button, Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import { Add } from '@mui/icons-material';

import ServiceFormDialog from './ServiceFormDialog';

import AgDataGrid from '../../components/agDataGrid/AgDataGrid';

export const Dashboard = () => {
  const [snackbarObj, setSnackbarObj] = useState({
    open: false,
    msg: '',
  });
  const [serviceData, setServiceData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchServicesApi().then(setServiceData);
  }, [])

  const [openDialog, setOpenDialog] = useState(false);

  const handleServiceCreate = (data) => {
    setServiceData(prev => [data, ...prev]);
  }

  const handleServiceUpdate = (data) => {
    setServiceData(prevData =>
      prevData.map(service =>
        service.id === data.id ? data : service
      )
    );
  }

  const handleServiceDelete = (id) => {
    setServiceData(prevData => prevData.filter(item => item.id !== id));
  }


  return <>
    <Box pt={3} pb={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h3'>Service Requests</Typography>
        <Button 
          variant='contained'
          sx={{ minWidth: '150px' }} 
          color='secondary' 
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
         >
          Create
        </Button>
      </Box>
      
      <Box mt={2}>
        <AgDataGrid 
          rowData={serviceData} 
          onCellClicked={cell => setSelectedRow(cell?.data)}
        />
      </Box>
    </Box>

    <ServiceFormDialog 
      open={openDialog || !!selectedRow} 
      onClose={() => {
        setOpenDialog(false);
        setSelectedRow(null);
      }} 
      selectedRow={selectedRow}
      setOpenSnack={(msg) => {
        setSnackbarObj({
          open: true,
          msg,
        })
      }}
      onServiceCreate={handleServiceCreate}
      onServiceUpdate={handleServiceUpdate}
      onServiceDelete={handleServiceDelete}
    />

    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={snackbarObj?.open}
      autoHideDuration={5000}
      onClose={() => setSnackbarObj(prev => ({...prev, open: false}))}
    >
      <Alert
        variant="filled"
        severity={'success'}
        onClose={() => setSnackbarObj(prev => ({...prev, open: false}))}
        >
        {snackbarObj?.msg}
      </Alert>
    </Snackbar>
  </>
}
