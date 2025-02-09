import React, { useState, useEffect, memo, use, useMemo } from 'react'
import MenuDropdown from '../common/MenuDropdown';

import {
  Container,
  Toolbar,
  AppBar,
  Avatar,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useFetchS3 } from '../../hooks/useFetchS3';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { logout, user } = useAuth();

  const logoUrl = useFetchS3('assets/logo.png');
  const aboutUsFileUrl = useFetchS3('assets/ABOUT US.pdf');

  const handleLogout = useMemo(() => {
    logout();
    setMenuAnchorEl(null);
  }, [])

  const menuItems = useMemo(() => [
    {
      label: <Typography variant='body' fontWeight={600}>{user?.username || ''}</Typography>,
      actions: () => {},
    },
    {
      label: <><LogoutIcon sx={{ fontSize: '20px' }} />Logout</>,
      action: handleLogout
    }
  ], [logoUrl, aboutUsFileUrl]);

  //downloading pdf file fetched from s3
  const handleAboutUsClick = useMemo(async () => {
    if (aboutUsFileUrl) {
      const response = await fetch(aboutUsFileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'ABOUT_US.pdf';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    }
  }, [aboutUsFileUrl])

  return <>
    <AppBar color='primary' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' flexWrap='wrap' gap={2}>
            <Box>
              {logoUrl ?
                <Box
                  component='img'
                  src={logoUrl}
                  alt='logo'
                  style={{
                    width: '180px',
                    filter: 'grayscale(100%) brightness(1000%)',
                  }}
                />
                :
                <Typography color='white' variant='h6'>Service Request Hub</Typography>
              }

            </Box>

            {!!user &&
              <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
                <Button variant='outlined' color='white' onClick={handleAboutUsClick}>About us</Button>
                <IconButton size='small' onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                  <Avatar />
                </IconButton>
              </Box>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <MenuDropdown
      items={menuItems}
      anchorEl={menuAnchorEl}
      handleClose={() => setMenuAnchorEl(null)}
    />
  </>
}

export default memo(Navbar);