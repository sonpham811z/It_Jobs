import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as nodata } from '~/assets/nodatafound.svg'; // Giả lập biểu tượng, bạn cần thay bằng file thực tế

const JobInvitation = () => {
  // Trạng thái cho tab đang chọn
  const [selectedTab, setSelectedTab] = useState(0);

  // Dữ liệu giả lập cho từng tab
  const pendingJobs = [
    {
      id: 1,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtMA3E5OCHKJMv9p19P_BF_7hjxyMy1jhZg&s',
      title: 'Fresher Python Developer',
      company: 'Tech Corp',
      city: 'Ho Chi Minh',
      workType: 'At office',
      status: 'Pending',
    },
    {
      id: 2,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtMA3E5OCHKJMv9p19P_BF_7hjxyMy1jhZg&s',
      title: 'Frontend Developer',
      company: 'ABC Tech',
      city: 'Hanoi',
      workType: 'Remote',
      status: 'Pending',
    },
  ];

  const acceptedJobs = [
    {
      id: 1,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtMA3E5OCHKJMv9p19P_BF_7hjxyMy1jhZg&s',
      title: 'Backend Java Developer (Spring Boot, SQL)',
      company: 'Công Ty Cổ Phần En Viet',
      city: 'Ho Chi Minh',
      workType: 'At office',
      status: 'Accepted',
    },
  ];

  const expiredJobs = [
    {
      id: 1,
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtMA3E5OCHKJMv9p19P_BF_7hjxyMy1jhZg&s',
      title: 'Full Stack Developer',
      company: 'XYZ Corp',
      city: 'Da Nang',
      workType: 'At office',
      status: 'Rejected',
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Accepted':
        return { backgroundColor: '#4caf50', color: 'white' }; // Màu xanh lá
      case 'Pending':
        return { backgroundColor: '#ffb300', color: 'white' }; // Màu vàng
      case 'Rejected':
        return { backgroundColor: '#ef5350', color: 'white' }; // Màu đỏ
      default:
        return { backgroundColor: '#bdbdbd', color: 'white' }; // Màu xám mặc định
    }
  };

  // Xử lý thay đổi tab
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ p: 2, mt: 3, borderRadius: 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#818285', // Màu mặc định
            '&.Mui-selected': {
              color: '#ef5350', // Màu khi tab được chọn
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#ef5350',
          },
        }}
      >
        <Tab
          label={
            <Badge
              badgeContent={pendingJobs.length}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ef5350', // Màu đỏ cho badge
                  color: 'white',
                  fontSize: '12px',
                  minWidth: '20px',
                  height: '20px',
                },
              }}
            >
              <Box sx={{ mr: 1 }}>Pending</Box>
            </Badge>
          }
        />
        <Tab
          label={
            <Badge
              badgeContent={acceptedJobs.length}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ef5350', // Màu xám cho badge
                  color: 'white',
                  fontSize: '12px',
                  minWidth: '20px',
                  height: '20px',
                },
              }}
            >
              <Box sx={{ mr: 1 }}>Accepted</Box>
            </Badge>
          }
        />
        <Tab
          label={
            <Badge
              badgeContent={expiredJobs.length}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ef5350', // Màu xám cho badge
                  color: 'white',
                  fontSize: '12px',
                  minWidth: '20px',
                  height: '20px',
                },
              }}
            >
              <Box sx={{ mr: 1 }}>Rejected</Box>
            </Badge>
          }
        />
      </Tabs>

      {/* Thông báo về thời gian lưu trữ */}
      <Box display="flex" alignItems="center" bgcolor={'#b6b9bf'} height={38}>
        <InfoOutlinedIcon sx={{ mr: 1, ml: 2, color: 'whitesmoke' }} fontSize="small" />
        <Typography variant="body2" sx={{ color: 'whitesmoke' }}>
          Your jobs are stored for the last 12 months.
        </Typography>
      </Box>

      {/* Nội dung tab */}
      {selectedTab === 0 && (
        <Box sx={{ textAlign: 'center', mt: 5, mb: 2 }}>
          {pendingJobs.length === 0 ? (
            <>
              <SvgIcon component={nodata} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              <Typography fontSize={'12px'} sx={{ color: '#a6a6a6', fontWeight: 'normal' }} mb={2}>
                You haven’t applied to any jobs in the last 12 months.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#ef5350', // Viền đỏ
                  color: '#ef5350', // Chữ đỏ
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#ef5350',
                    backgroundColor: '#ffebee', // Màu hồng nhạt khi hover
                  },
                }}
              >
                Explore jobs
              </Button>
            </>
          ) : (
            // Nội dung khi có dữ liệu
            pendingJobs.map((job, index) => (
              <Box key={job.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />} {/* Đường thẳng phân cách nếu có từ 2 công việc trở lên */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    transition: 'box-shadow 0.3s ease-in-out', // Hiệu ứng transition
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ khi hover
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={job.logo}
                      alt={`${job.company} logo`}
                      sx={{ width: 75, height: 75, mr: 2, border: '1px solid #e0e0e0' }}
                    />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#121212', fontSize: '12px', mt: ' 3px' }}>
                        {job.company}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#a6a6a6', fontSizeL: '12px', mt: '3px' }}>
                        {job.city} - {job.workType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      sx={{
                        ...getStatusStyles(job.status),
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2,
                        py: 0.5,
                      }}
                    >
                      {job.status}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      )}

      {selectedTab === 1 && (
        <Box sx={{ textAlign: 'center', mt: 5, mb: 2 }}>
          {acceptedJobs.length === 0 ? (
            <>
              <SvgIcon component={nodata} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              <Typography fontSize={'12px'} sx={{ color: '#a6a6a6', fontWeight: 'normal' }} mb={2}>
                You haven’t saved any jobs yet.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#ef5350',
                  color: '#ef5350',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#ef5350',
                    backgroundColor: '#ffebee',
                  },
                }}
              >
                Explore jobs
              </Button>
            </>
          ) : (
            // Nội dung khi có dữ liệu
            acceptedJobs.map((job, index) => (
              <Box key={job.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />} {/* Đường thẳng phân cách nếu có từ 2 công việc trở lên */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: '8px',
                    transition: 'box-shadow 0.3s ease-in-out', // Hiệu ứng transition
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ khi hover
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={job.logo}
                      alt={`${job.company} logo`}
                      sx={{ width: 75, height: 75, mr: 2, border: '1px solid #e0e0e0' }}
                    />
                    <Box textAlign={'left'}>
                      <Typography variant="body1" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.primary" sx={{ color: '#121212', fontSize: '12px', mt: ' 4px' }}>
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: '#a6a6a6', fontSize: '12px', mt: ' 4px' }}>
                        {job.city} - {job.workType}
                      </Typography>
                    </Box>
                  </Box>
 
                    <Box textAlign="right">
                    <Button
                      variant="contained"
                      sx={{
                        ...getStatusStyles(job.status),
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2,
                        py: 0.5,
                      }}
                    >
                      {job.status}
                    </Button>
                  </Box>
                  </Box>
                </Box>
            ))
          )}
        </Box>
      )}

      {selectedTab === 2 && (
        <Box sx={{ textAlign: 'center', mt: 5, mb: 2 }}>
          {expiredJobs.length === 0 ? (
            <>
              <SvgIcon component={nodata} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              <Typography fontSize={'12px'} sx={{ color: '#a6a6a6', fontWeight: 'normal' }} mb={2}>
                You haven’t saved any jobs yet.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#ef5350',
                  color: '#ef5350',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderColor: '#ef5350',
                    backgroundColor: '#ffebee',
                  },
                }}
              >
                Explore jobs
              </Button>
            </>
          ) : (
            // Nội dung khi có dữ liệu
            expiredJobs.map((job, index) => (
              <Box key={job.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />} {/* Đường thẳng phân cách nếu có từ 2 công việc trở lên */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    transition: 'box-shadow 0.3s ease-in-out', // Hiệu ứng transition
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ khi hover
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={job.logo}
                      alt={`${job.company} logo`}
                      sx={{ width: 75, height: 75, mr: 2, border: '1px solid #e0e0e0' }}
                    />
                    <Box textAlign={'left'}>
                      <Typography variant="body1" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.primary" sx={{ color: '#121212', fontSize: '12px', mt: ' 4px' }}>
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: '#a6a6a6', fontSize: '12px', mt: ' 4px' }}>
                        {job.city} - {job.workType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      sx={{
                        ...getStatusStyles(job.status),
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2,
                        py: 0.5,
                      }}
                    >
                      {job.status}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default JobInvitation;