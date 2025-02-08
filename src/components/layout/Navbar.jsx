import React, { useState, useEffect, memo, use } from 'react'
import MenuDropdown from '../common/MenuDropdown';

import {
  Container,
  Toolbar,
  AppBar,
  Avatar,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// import { getUrl } from 'aws-amplify/storage';
import { useFetchS3 } from '../../hooks/useFetchS3';

import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { logout, user } = useAuth();

  const logoUrl = useFetchS3('assets/logo.png');

  const handleLogout = () => {
    logout();
    setMenuAnchorEl(null);
  }

  const menuItems = [
    {
      label: <><LogoutIcon sx={{ fontSize: '20px' }} />Logout</>,
      action: handleLogout
    }
  ];

  return <>
    <AppBar color='primary' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
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
              <IconButton size='small' onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                <Avatar />
              </IconButton>
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