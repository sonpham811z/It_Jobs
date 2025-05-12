import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import DescriptionIcon from '@mui/icons-material/Description'
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid,Paper } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { ReactComponent as plane } from '~/assets/maybay.svg';
import { ReactComponent as heart } from '~/assets/traitim.svg';
import { ReactComponent as mail } from '~/assets/mail.svg';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';


const Dashboard = () => {
  // Dữ liệu giả lập (có thể thay bằng dữ liệu từ API)
  const userInfo = {
    name: 'Thái Sơn Phạm',
    email: 'thaisonpham243@gmail.com',
    avatar: 'https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeTEzV2c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b7009a491c587a4a9c0798d5e8a8653c3b202440/ACg8ocKdTYhyHPMiun6BRMkv7Fd_xMWoIyGWmUyCIYOgzDn1UzcUqA=s200-c.jpg', // Placeholder cho ảnh đại diện
  };
  const cvData = {
    fileName: 'Template (1).docx',
    lastUpload: '25/04/2025',
  };
  const activities = {
    appliedJobs: 0,
    savedJobs: 1,
    jobInvitations: 0,
  };

  return (
    <>
        <Box
        sx={{
            p: 2,
            borderRadius: 1,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
            bgcolor: 'white',
            mt: 3,
            pl: 3
        }}
        >
        <Box display="flex" alignItems="center">
            <Avatar
            src={userInfo.avatar}
            alt={userInfo.name}
            sx={{ width: 70, height: 70, mr: 4}}
            />
            <Box flexGrow={1} mt={2}>
            <Typography variant="h5" fontWeight="bold" sx={{mb: '12px'}}>
                {userInfo.name}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
                <WorkOutlineOutlinedIcon sx={{ mr: 1, fontSize: '18px', color: '#bdbdbd'}} />
                <Typography variant="body2" sx={{color: '#a6a6a6'}}>
                Update your title
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1.5}>
                <EmailOutlinedIcon sx={{ color: '#bdbdbd', mr: 1, fontSize: '18px' }} />
                <Typography variant="body2" color="text.secondary" sx={{color: '#a6a6a6'}}>
                {userInfo.email}
                </Typography>
            </Box>
            <Link
            component={RouterLink}
            to="/seeker/profile"
            underline="hover"
            sx={{
                color: '#0e2eed',
                fontSize: '14px',
                display: 'flex',
                '&:hover': {
                textDecoration: 'underline'
                },
                '&:visited': {
                color: '#0e2eed', // tránh đổi thành màu tím
                }
            }}
            >
            Update your profile
            <KeyboardArrowRightOutlinedIcon sx={{ ml: 0.5 }} />
            </Link>
            </Box>
        </Box>
        </Box>
        
        <Box
        mt={2}
      sx={{
        p: 2,
        borderRadius: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
        bgcolor: 'white',
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="body1" fontWeight="bold" mb={2} ml={0.5}>
            Your Attached CV
          </Typography>

      {/* Khung bao quanh thông tin CV với màu nền xám */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: '#f7f7f7 ', // Màu nền xám nhạt
          borderRadius: 2,
          mb: 2,
          border: '1px solid rgb(223, 221, 221)'
        }}
      >
        <DescriptionIcon sx={{ color: '#ef5350', mr: 1, fontSize: '50px' }} />

        <Box>
            <Box ml={1.5}>
                <Typography variant="body2" fontWeight="bold">
                    {cvData.fileName}
                </Typography>
                <Typography sx={{color: '#a6a6a6' , fontSize: '13px', mt:'2px'}}>
                    Last upload: {cvData.lastUpload}
                </Typography>
                <Link
            component={RouterLink}
            to="/seeker/cv"
            underline="hover"
            sx={{
                color: '#0e2eed',
            
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            mt: '5px',
            fontSize: '14px',
            '&:hover': { textDecoration: 'underline' },
            }}
            >
            Update your profile
            <KeyboardArrowRightOutlinedIcon sx={{ ml: 0.5 }} />
            </Link>
            </Box>
        </Box>
      </Box>

    </Box>

    <Box
      sx={{
        p: 3,
        borderRadius: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
        bgcolor: 'white',
        mt: 2
      }}
    >
      {/* Tiêu đề */}
      <Typography variant="body1" fontWeight="bold" mb={2}>
        Your activities
      </Typography>

      {/* Khối thống kê */}
      <Grid container spacing={2}>
        {/* Applied Jobs */}
        <Grid item xs={4}>
          <Paper
            sx={{
                p: 2,
                bgcolor: '#eaf0fa',
                borderRadius: 2,
                position: 'relative',
                border: '1px solid transparent', // Viền mặc định trong suốt
                transition: 'border 0.3s ease-in-out', // Hiệu ứng chuyển đổi mượt mà
                '&:hover': {
                  border: '1px solid #085bdd', 
                },
              }}
          >
            <SvgIcon
            component={plane} inheritViewBox
              sx={{
                position: 'absolute',
                top: '30px',
                right: 12,
                fontSize: '70px'                
              }}
            />
            <Typography variant="body2" sx={{color: 'black', fontSize: '16.5px'}}>
              Applied Jobs
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{color: '#085bdd', fontSize: '30px', mt: '8px'}}>
              {activities.appliedJobs}
            </Typography>
          </Paper>
        </Grid>

        {/* Saved Jobs */}
        <Grid item xs={4}>
          <Paper
            sx={{
                p: 2,
                bgcolor: '#fff1f1',
                borderRadius: 2,
                position: 'relative',
                border: '1px solid transparent', // Viền mặc định trong suốt
                transition: 'border 0.3s ease-in-out', // Hiệu ứng chuyển đổi mượt mà
                '&:hover': {
                  border: '1px solid #c82222', // Viền đỏ khi hover
                },
              }}
          >
           <SvgIcon
            component={heart} inheritViewBox
              sx={{
                position: 'absolute',
                top: '30px',
                right: 12,
                fontSize: '72px'                
              }}
            />
            <Typography variant="body2" sx={{color: 'black', fontSize: '16.5px'}}>
              Saved Jobs
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{color: '#c82222 ', fontSize: '30px', mt: '8px'}}>
              {activities.savedJobs}
            </Typography>
            <Link
              href="#"
              sx={{
                color: '#0d6efd',
                textDecoration: 'none',
                fontSize: '14px',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
            </Link>
          </Paper>
        </Grid>

        {/* Job Invitations */}
        <Grid item xs={4}>
          <Paper
             sx={{
                p: 2,
                bgcolor: '#eaf9e9 ',
                borderRadius: 2,
                position: 'relative',
                border: '1px solid transparent', // Viền mặc định trong suốt
                transition: 'border 0.3s ease-in-out', // Hiệu ứng chuyển đổi mượt mà
                '&:hover': {
                  border: '1px solid #0ab305', // Viền đỏ khi hover
                },
              }}
          >
             <SvgIcon
            component={mail} inheritViewBox
              sx={{
                position: 'absolute',
                top: '30px',
                right: 12,
                fontSize: '72px'                
              }}
            />
            <Typography variant="body2" sx={{color: 'black', fontSize: '16.5px'}}>
              Job Invitations
            </Typography>
            <Typography variant="h5" fontWeight="bold" sx={{color: '#0ab305', fontSize: '30px', mt: '8px'}}>
              {activities.jobInvitations}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;