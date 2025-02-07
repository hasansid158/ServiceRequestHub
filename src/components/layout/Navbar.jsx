import React, { useState } from 'react'

import {
  Container,
  Toolbar,
  AppBar,
  Avatar,
  IconButton,
  MenuItem,
  Typography,
  Menu
} from '@mui/material';

const MenuDropdown = ({
  anchorEl = false,
  handleClose = () => { },
  handleItemClick = () => { },
  items = []
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={anchorEl}
    onClose={handleClose}
  >
    {items.map((item) => (
      <MenuItem key={item} onClick={() => handleItemClick(item)}>
        {item}
      </MenuItem>
    ))}
  </Menu>
);

const menuItemMap = {
  'Logout': () => console.log('logout'),
}

const menuItems = [
  'Logout',
];

const Navbar = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  return <>
    <AppBar color='primary' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <IconButton size='small' onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>

    <MenuDropdown
      items={menuItems}
      anchorEl={menuAnchorEl}
      handleItemClick={item => {
        menuItemMap?.[item]?.();
        setMenuAnchorEl(null);
      }}
    />
  </>
}

export default Navbar