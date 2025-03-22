import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAuth0 } from "@auth0/auth0-react"

function Profile() {
const {  user } = useAuth0()
  console.log(user.picture);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { logout } = useAuth0()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml:1 }}
            aria-controls={open ? 'basic-menu-profil' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
            alt="Son Pham"
            src={user.picture}
            sx={{ width: 30, height: 30 }}
        />
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
      
          <MenuItem  sx={{
            
          '&:hover': {color: 'primary.main'}
        }}>
            <Avatar sx={{height:28,width:28,mr:1}} /> Profile
          </MenuItem>
     

        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem  sx={{
          '&:hover': {color: 'red','& .icon_logout': {color: 'red'}}
          
        }}
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        
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
