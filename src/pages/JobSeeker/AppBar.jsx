import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import PeopleIcon from '@mui/icons-material/People'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentEmployer } from '~/redux/employer/employerSlice'

function TopAppBar() {
  
  // const currentEmployer = useSelector(selectCurrentEmployer)

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(to right, #1f1e1e 15%, #911625 100%), #f5f5f5',
        boxShadow: 'none',
        zIndex: 1100
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left section */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <PeopleIcon fontSize="small" />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Nhà tuyển dụng
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ArrowRightAltIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption">Chuyển</Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Right section */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <NotificationsNoneIcon sx={{ color: 'white' }} />
          <Paper
            elevation={0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                color: 'white',
                backgroundColor: 'transparent',
                border: '1px solid white',
                borderRadius: 999, 
                boxShadow: 'none' 
            }}
          >
            <Avatar
              // src={currentEmployer.logoURL}
              sx={{ width: 24, height: 24, mr: 1, my:0.2 }}
            />
            <Typography variant="body2" fontWeight="medium">
              hehe
            </Typography>
          </Paper>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar
