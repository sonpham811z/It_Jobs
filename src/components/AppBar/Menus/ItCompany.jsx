import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Check from '@mui/icons-material/Check';
import Box from '@mui/material/Box';

function ItCompany() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="basic-button-ItCompany"
        aria-controls={open ? 'basic-menu-ItCompany' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
        color: 'text.primary',

          fontSize: 14,
          fontWeight: 'bold'
        }}
        endIcon={<ExpandMoreIcon />}
      >
        IT Companies
      </Button>
      <Menu
        id="basic-menu-ItCompany"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-ItCompany',
        }}
        MenuProps={{
          disableScrollLock: true,
        }}
        
      >
        <MenuItem onClick={handleClose}>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemText>Custom spacing...</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default ItCompany;
