import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import {Typography} from  '@mui/material'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { toast } from "react-toastify"
import Logout from '@mui/icons-material/Logout';
import { useAuth0 } from "@auth0/auth0-react"

function Profile() {
const {  user } = useAuth0()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { logout } = useAuth0()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loginToastShown')
    toast.info("Đăng xuất thành công!")
    logout({ returnTo: window.location.origin })
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1 }}
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            alt="Son Pham"
            src={user.picture}
            sx={{ width: 30, height: 30 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
            { user.name }
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        disableScrollLock = { true }
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Điểm neo menu (dưới + phải của anchorEl)
        transformOrigin={{ vertical: "top", horizontal: "right" }} // Điểm xuất phát menu (trên + phải của menu)
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile',
        }}
      >
          <MenuItem >
          <ListItemIcon>
            <BusinessCenterIcon fontSize="small" />
          </ListItemIcon> IT_Jobs Profile
          </MenuItem>
     

        <Divider />
     
        <MenuItem >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          My Jobs
        </MenuItem>

        <Divider />

        <MenuItem  sx={{
          '&:hover': {color: 'red','& .icon_logout': {color: 'red'}}
          
        }}
       onClick={handleLogout}
        
        >
          <ListItemIcon className='icon_logout'>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profile;
