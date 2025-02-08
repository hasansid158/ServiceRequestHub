import { memo } from "react";
import { Menu, MenuItem } from "@mui/material";

const MenuDropdown = ({
  anchorEl = null,
  handleClose = () => { },
  handleItemClick = () => { },
  items = [],
  ...rest
}) => (
  <Menu
    anchorEl={anchorEl}
    open={anchorEl}
    onClose={handleClose}
    {...rest}
  >
    {items.map((item = {}) => (
      <MenuItem
        key={item}
        onClick={item?.action}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        {item?.label || ''}
      </MenuItem>
    ))}
  </Menu>
);

export default memo(MenuDropdown);