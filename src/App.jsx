import { useState } from 'react'

import AppRoutes from './components/routes/AppRoutes'
import Navbar from './components/layout/Navbar'

import { Box, Container } from '@mui/material'

function App() {

  return (
    <Box sx={{ backgroundColor: 'common.background', height: '100dvh' }}>
      <Navbar />
      <Container maxWidth='xl'>
        <AppRoutes />
      </Container>
    </Box>
  )
}

export default App
