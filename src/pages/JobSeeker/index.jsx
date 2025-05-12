import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ITJobsProfileSection from '~/pages/JobSeeker/IT_JobsProfile/index'

import { ReactComponent as Logo } from '~/assets/logo.svg';
import TopAppBar from './AppBar';
import MyJobs from '~/pages/JobSeeker/MyJobs/index'
import JobsInvitation from '~/pages/JobSeeker/JobInviatation/index'
import ManageCV from '~/pages/JobSeeker/CVAttachment/index'
import DashBoard from '~/pages/JobSeeker/DashBoard/index'
import { useParams, useNavigate } from 'react-router-dom';


import { useConfirm } from 'material-ui-confirm';

const SECTIONS = {
  DASHBOARD: 'dashboard',
  CV: 'cv',
  PROFILE: 'profile',
  MY_JOBS: 'myJobs',
  JOB_INVITATION: 'jobInvite',
  SETTING: 'setting',
  LOGOUT : 'logout'
}

export const mainMenus = [
  {
    key: SECTIONS.DASHBOARD,
    label: 'Dashboard',
    icon: <SpaceDashboardOutlinedIcon fontSize="small" />
  },
  {
    key: SECTIONS.MY_JOBS,
    label: 'My Jobs',
    icon: <AssignmentOutlinedIcon fontSize="small" />
  },
  {
    key: SECTIONS.PROFILE,
    label: 'IT_Jobs Profile',
    icon: <BusinessOutlinedIcon fontSize="small" />
  },
  {
    key: SECTIONS.CV,
    label: 'CV Attachment',
    icon: <FactCheckOutlinedIcon fontSize="small" />
  },
  {
    key: SECTIONS.JOB_INVITATION,
    label: 'Jobs invitation',
    icon: <MarkEmailUnreadOutlinedIcon fontSize="small" />
  },
  
  {
    key: SECTIONS.SETTING,
    label: 'Cài đặt',
    icon: <SettingsOutlinedIcon fontSize="small" />
  },
  {
    key: SECTIONS.LOGOUT,
    label: 'Đăng xuất',
    icon: <LogoutOutlinedIcon fontSize="small" />
  }
];



const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    onClick={onClick}
    sx={{
      px: 1,
      py: 1,
      borderRadius: 1,
      fontSize: '14px',
      bgcolor: isActive ? '#e3f2fd' : 'transparent',
      fontWeight: isActive ? 'bold' : 'normal',
      cursor: 'pointer'
    }}
  >
    {icon}
    <span>{label}</span>
  </Stack>
);

const JobSeeker = () => {
  const [selectedSection, setSelectedSection] = useState(SECTIONS.DASHBOARD);
  const [openMenus, setOpenMenus] = useState({
    overview: true,
    recruitment: true,
    company: true,
    accountManagement: true
  });
  const navigate = useNavigate();
  const { section } = useParams();


  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  useEffect(() => {
    const validSections = Object.values(SECTIONS);
  
    // Nếu không có section hoặc section không hợp lệ => chuyển về dashboard
    if (!section || !validSections.includes(section)) {
      navigate(`/seeker/${SECTIONS.DASHBOARD}`, { replace: true });
    } else if (section !== selectedSection) {
      setSelectedSection(section);
    }
  }, [section, navigate, selectedSection]);
 
  const handleSelectSection = (key) => {
    navigate(`/seeker/${key}`);
  };
  
  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ paddingX: 3, bgcolor: 'white' }}>
        <Grid container spacing={2}>
        <Grid
          xs={12}
          sm={2.5}
          sx={{
            borderRight: '1px solid #e0e0e0',
            minHeight: '100vh',
            bgcolor: 'white'
          }}
>
  <Stack direction="column" spacing={1} sx={{ fontSize: 11, px: 1 }}>
    <Stack direction="row" alignItems="center" spacing={1} pt={2}>
      <SvgIcon sx={{ fontSize: 100 }} component={Logo} inheritViewBox />
      <Typography variant="h6" fontWeight="bold" color="primary">
        IT_Jobs
      </Typography>
    </Stack>

    {/* Menu items - no collapses */}
    {mainMenus.map((item) => (
      <SidebarItem
        key={item.key}
        icon={item.icon}
        label={item.label}
        
        isActive={selectedSection === item.key}
        onClick={() => handleSelectSection(item.key)}
      />
    ))}

    <Divider sx={{ my: 2 }} />
  </Stack>
</Grid>


          <Grid xs={12} sm={9.5}>
          <Box p={1}>
            <TopAppBar/>
            {selectedSection === SECTIONS.DASHBOARD && <DashBoard/>}
            {selectedSection === SECTIONS.MY_JOBS && <MyJobs/>}
            {selectedSection === SECTIONS.CV && <ManageCV/>}
            {selectedSection === SECTIONS.JOB_INVITATION && <JobsInvitation/>}
            {selectedSection === SECTIONS.PROFILE && <ITJobsProfileSection/>}
            {selectedSection === SECTIONS.SETTING && <h2>Cài đặt</h2>}

          </Box>

          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobSeeker;
