import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as education } from '~/assets/education.svg';
import { ReactComponent as experience } from '~/assets/experience.svg';
import { ReactComponent as certificate } from '~/assets/certi.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileModal from './component/profileModal';
import EducationModal from './component/educationModal';
import WorkExperienceModal from './component/experienceModal';
import CertificatesModal from './component/certificateModal'

const ITJobsProfileSection = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Thái Sơn Phạm",
    title: "Software Developer",
    email: "thaisonpham243@gmail.com",
    phone: "0327299509",
    dob: "01/01/1990",
    gender: "Male",
    address: "Hanoi, Vietnam",
    personalLink: "linkedin.com/in/thaisonpham",
    avatar: "https://itviec.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeTEzV2c9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b7009a491c587a4a9c0798d5e8a8653c3b202440/ACg8ocKdTYhyHPMiun6BRMkv7Fd_xMWoIyGWmUyCIYOgzDn1UzcUqA=s200-c.jpg",
  })

  const [experienceData, setExperienceData] = useState([
    {
      jobTitle: 'Back End, Fresher',
      company: 'ABC Tech',
      duration: '01/2023 - 12/2023',
      description: 'Worked on building APIs and managing databases.',
    },
    {
      jobTitle: 'Back End, Fresher',
      company: 'XYZ Corp',
      duration: '01/2022 - 12/2022',
      description: 'Assisted in developing server-side applications.',
    },
  ])

  




  // Trạng thái để mở form thêm thông tin (mô phỏng)
  const [isAdding, setIsAdding] = useState(false);

  // Hàm xóa mục học vấn
  const handleDelete = (index) => {
    setExperienceData((prev) => prev.filter((_, i) => i !== index));
    setCertificateData((prev) => prev.filter((_, i) => i !== index));
  };

  // Modal Profile
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = (userData)=> {
    console.log(userData);
    
    setUserInfo({...userData})
    setOpen(false)
  }


  // Modal education
  const [openEduModal, setOpenEduModal] = useState(false)
  const [educationData, setEducationData] = useState([])
  const handleOpenEduModal = () => {
    setOpenEduModal(true)
  }

  const handleCloseEduModal = () => {
    setOpenEduModal(false)
  }

  const handleSaveEduModal = (data) => {
    const updated = [...educationData, data]
    console.log(updated);
    setEducationData(prev => [...prev, data]);
  };
  

  //WorkExperience modal
  const [workModalOpen, setWorkModalOpen] = useState(false)
  const [workData, setWorkData] = useState([])
  const handleOpenWorkModal = () => {
    setWorkModalOpen(true)
  }

  const handleCloseWorkModal = () => {
    setWorkModalOpen(false)
  }

  const handleSaveWork = (data) => {
    
    setWorkData(prev => [...prev,data])
    console.log("Saved work experience data:", data)
  }


  //certificate modal
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [certificateData, setCertificateData] = useState([])

  const handleOpenCertificateModal = () => {
    setCertificateModalOpen(true)
  }

  const handleCloseCertificateModal = () => {
    setCertificateModalOpen(false)
  }

  const handleSaveCertificate = (data) => {
    const update = [...certificateData, data]
    setCertificateData(prev => [...prev,data])
    console.log(update);
  }
  
  return (
    <>
    <Box mt={3}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          position: 'relative', // Để định vị EditIcon
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            color: 'primary.main'

          }}
          onClick={handleOpen}
        >
          <EditIcon />
        </IconButton>

        <CardContent>
          <Stack direction="row" spacing={5} alignItems="center" mb={4} ml={4} mt={1}>
            <Avatar
              src={userInfo.avatar}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography sx={{ fontSize: '24px' }} fontWeight="bold">
                {userInfo.name}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', color: '#a6a6a6' }}>
                {userInfo.title}
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={4} ml={1.5} sx={{ color: '#a6a6a6' }}>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <MailOutlineIcon fontSize="small" />
                <Typography>{userInfo.email}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" />
                <Typography>{userInfo.phone}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CakeIcon fontSize="small" />
                <Typography>{userInfo.dob}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <WcIcon fontSize="small" />
                <Typography>{userInfo.gender}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" />
                <Typography>{userInfo.address}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LinkIcon fontSize="small" />
                <Typography>{userInfo.personalLink}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <ProfileModal open={open} onClose={handleClose} userData={userInfo} onSave={handleSave} />
    </Box>

    <Box mt={2}>
      <Card
        sx={{
          borderRadius: 3, // Bo góc cho thẻ
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" ml={'36px'}>
              <Typography variant="h6" fontWeight="bold">
                Education
              </Typography>
               {/* Ẩn SvgIcon nếu có dữ liệu */}
               {educationData?.length === 0 && (
                <SvgIcon component={education} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              )}
            </Box>
            <Box display="flex" gap={2}>
             

              <IconButton
                sx={{
                  borderRadius: '50%', // Đảm bảo hình tròn
                  color: '#ef5350', // Màu đỏ nhạt cho biểu tượng
                  bgcolor: '#ffebee', // Màu hồng nhạt cho nền
                  width: 30, // Kích thước đồng đều
                  height: 30, // Kích thước đồng đều
                  mt: '0px',
                  '&:hover': {
                    bgcolor: '#ffcdd2', // Màu khi hover
                  },
                }}
                onClick={handleOpenEduModal}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Thêm đường kẻ ngang dưới tiêu đề Education */}
          {educationData?.length > 0 && <Divider sx={{ my: 1, ml: 4 }} />}

          {/* Hiển thị dữ liệu học vấn nếu có */}
          {educationData?.length > 0 ? (
            educationData?.map((item, index) => (
              <Box key={index} mt={2}>
                {index > 0 && <Divider sx={{ my: 2, ml: 4 }} />} {/* Đường kẻ phân cách giữa các mục */}
                <Box display="flex" alignItems="center" justifyContent="space-between" >
                  <Box>
                    <Typography sx={{ml: '36px', mt: '5px', color: '#414042 '}} fontSize={'16px'} fontWeight="bold">
                      {item.major}
                    </Typography>
                    <Typography sx={{ml: '36px', mt: '5px', color: '#414042 '}} variant="body2" color="text.primary">
                      {item.school}
                    </Typography>
                    <Typography sx={{ml: '36px', mt: '5px', color: '#414042 '}} variant="body2" color="text.secondary">
                      {item.isCurrentlyStudying ? `${item.fromMonth}/${item.fromYear} - NOW` : `${item.fromMonth}/${item.fromYear} - ${item.toMonth}/${item.toYear} `}
                    </Typography>
                    <Typography sx={{ml: '36px', mt: '5px', color: '#414042 '}} variant="body2" color="text.secondary">
                      {item.additionalDetails}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton sx={{ color: '#ef5350' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: '#ef5350' }} onClick={() => handleDelete(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{color: '#a6a6a6', ml: '36px'}}>
              Share your background education
            </Typography>
          )}
        </CardContent>
      </Card>

      <EducationModal open={openEduModal} onClose={handleCloseEduModal} onSave={handleSaveEduModal} />
    </Box>

    <Box mt={2}>
      <Card
        sx={{
          borderRadius: 3, // Bo góc cho thẻ
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" ml={'36px'}>
              <Typography variant="h6" fontWeight="bold">
                Experience
              </Typography>
              {/* Ẩn SvgIcon nếu có dữ liệu */}
              {workData?.length === 0 && (
                <SvgIcon component={experience} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              )}
            </Box>
            <Box display="flex" gap={2}>
              <IconButton
                sx={{
                  borderRadius: '50%', // Đảm bảo hình tròn
                  color: '#ef5350', // Màu đỏ nhạt cho biểu tượng
                  bgcolor: '#ffebee', // Màu hồng nhạt cho nền
                  width: 30, // Kích thước đồng đều
                  height: 30, // Kích thước đồng đều
                  mt: '0px',
                  '&:hover': {
                    bgcolor: '#ffcdd2', // Màu khi hover
                  },
                }}
                onClick={handleOpenWorkModal}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Thêm đường kẻ ngang dưới tiêu đề Experience */}
          {workData.length > 0 && <Divider sx={{ my: 1, ml: 4 }} />}

          {/* Hiển thị dữ liệu kinh nghiệm nếu có */}
          {workData.length > 0 ? (
            workData.map((item, index) => (
              <Box key={index} mt={2}>
                {index > 0 && <Divider sx={{ my: 2, ml: 4 }} />} {/* Đường kẻ phân cách giữa các mục */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} fontSize={'16px'} fontWeight="bold">
                      {item.jobTitle}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.primary">
                      {item.company}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.secondary">
                      {item.isCurrentlyWorking ? `${item.fromMonth}/${item.fromYear} - NOW` : `${item.fromMonth}/${item.fromYear} - ${item.toMonth}/${item.toYear} `}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton sx={{ color: '#ef5350' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: '#ef5350' }} onClick={() => handleDelete(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ color: '#a6a6a6', ml: '36px' }}>
              Highlight detailed information about your job history
            </Typography>
          )}
        </CardContent>
      </Card>

      <WorkExperienceModal open={workModalOpen} onClose={handleCloseWorkModal} onSave={handleSaveWork} />
    </Box>

    <Box mt={2}>
      <Card
        sx={{
          borderRadius: 3, // Bo góc cho thẻ
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Bóng nhẹ
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" ml={'36px'}>
              <Typography variant="h6" fontWeight="bold">
                Certificate
              </Typography>
              {/* Ẩn SvgIcon nếu có dữ liệu */}
              {certificateData.length === 0 && (
                <SvgIcon component={certificate} inheritViewBox sx={{ fontSize: '70px', ml: '20px' }} />
              )}
            </Box>
            <Box display="flex" gap={2}>
              <IconButton
                sx={{
                  borderRadius: '50%', // Đảm bảo hình tròn
                  color: '#ef5350', // Màu đỏ nhạt cho biểu tượng
                  bgcolor: '#ffebee', // Màu hồng nhạt cho nền
                  width: 30, // Kích thước đồng đều
                  height: 30, // Kích thước đồng đều
                  mt: '0px',
                  '&:hover': {
                    bgcolor: '#ffcdd2', // Màu khi hover
                  },
                }}
                onClick={handleOpenCertificateModal}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Thêm đường kẻ ngang dưới tiêu đề Certificate */}
          {certificateData.length > 0 && <Divider sx={{ my: 1, ml: 4 }} />}

          {/* Hiển thị dữ liệu chứng chỉ nếu có */}
          {certificateData.length > 0 ? (
            certificateData.map((item, index) => (
              <Box key={index} mt={2}>
                {index > 0 && <Divider sx={{ my: 2, ml: 4 }} />} {/* Đường kẻ phân cách giữa các mục */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} fontSize={'16px'} fontWeight="bold">
                      {item.certificateName}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.primary">
                      {item.organization}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.secondary">
                      {`${item.issueMonth}/${item.issueYear}`}
                    </Typography>
                    <Typography sx={{ ml: '36px', mt: '6px', color: '#414042' }} variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Link
                      href={item.certificateURL}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        ml: '36px',
                        mt: '5px',
                        color: '#1976d2', // Màu xanh dương
                        display: 'inline-flex', // để text và icon nằm cùng dòng
                        alignItems: 'center',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Certificate Link
                    <OpenInNewIcon sx={{ml: '6px'}}/>
                    </Link>
                  </Box>
                  <Box>
                    <IconButton sx={{ color: '#ef5350' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ color: '#ef5350' }} onClick={() => handleDelete(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ color: '#a6a6a6', ml: '36px' }}>
              Provides evidence of your specific expertise and skills
            </Typography>
          )}
        </CardContent>
      </Card>

      <CertificatesModal
            open={certificateModalOpen}
            onClose={handleCloseCertificateModal}
            onSave={handleSaveCertificate}
      />
    </Box>
    </>
    

  );
};

export default ITJobsProfileSection;