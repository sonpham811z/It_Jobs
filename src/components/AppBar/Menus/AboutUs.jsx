import  { useState } from 'react';

import Button from '@mui/material/Button';

import Box from '@mui/material/Box';

function AboutUs() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  return (
    <Box>
      <Button
        id="basic-button-started"
        aria-controls={open ? 'basic-menu-started' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
        color: 'text.primary',
          fontSize: 14,
          fontWeight: 'bold'
        }}
     
      >
        About Us
      </Button>
      
    </Box>
  );
}

export default AboutUs;
