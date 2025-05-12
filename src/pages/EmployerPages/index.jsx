import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "~/assets/logo.svg";
import TopAppBar from "~/components/AppBar/AppBarEmployer/index"
import JobPost from "~/pages/EmployerPages/jobPostPage/index"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CompanyInfo from './companyInfo'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch } from 'react-redux'
import { logOutEmployerAPI } from '~/redux/employer/employerSlice'


const SECTIONS = {
  DASHBOARD: 'dashboard',
  POSTJOB: 'postJob',
  CV: 'CV',
  CV_SAVED: 'cvSaved',
  FIND_EMPLOYEE: 'findEmployee',
  COMPANY_INFO: 'companyInfo',
  ACCOUNT: 'account'
}

const mainMenus = [
  {
    label: 'Tổng quan',
    key: 'overview',
    items: [
      { key: SECTIONS.DASHBOARD, label: 'Dashboard', icon: <SpaceDashboardOutlinedIcon fontSize="small" /> }
    ]
  },
  {
    label: 'Quản lý đăng tuyển',
    key: 'recruitment',
    items: [
      { key: SECTIONS.POSTJOB, label: 'Đăng tin tuyển dụng', icon: <AssignmentOutlinedIcon fontSize="small" /> },
      { key: SECTIONS.CV, label: 'Hồ sơ ứng tuyển', icon: <FactCheckOutlinedIcon fontSize="small" /> },
      { key: SECTIONS.CV_SAVED, label: 'Hồ sơ đã lưu', icon: <BookmarkAddedOutlinedIcon fontSize="small" /> },
      { key: SECTIONS.FIND_EMPLOYEE, label: 'Tìm ứng viên mới', icon: <PersonSearchOutlinedIcon fontSize="small" /> }
    
    ]
  },
  {
    label: 'Quản lý tài khoản',
    key: 'accountManagement',
    items: [
      { key: SECTIONS.COMPANY_INFO, label: 'Thông tin công ty', icon: <BusinessOutlinedIcon fontSize="small" /> },
      { key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlinedIcon fontSize="small" /> }
    ]
  }
  
]

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
      bgcolor: isActive ? '#e3f2fd' : 'transparent',
      fontWeight: isActive ? 'bold' : 'normal',
      cursor: 'pointer'
    }}
  >
    {icon}
    <span>{label}</span>
  </Stack>
)

const Boards = () => {
  const [selectedSection, setSelectedSection] = useState(SECTIONS.DASHBOARD)
  const [openMenus, setOpenMenus] = useState({
    overview: true,
    recruitment: true,
    accountManagement: true
  })

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  const dispatch = useDispatch()
  const confirm = useConfirm()
  const handleLogout = () => {
    confirm({
      title: 'Are you confirm to logout ?',
      confirmationText: 'Logout',
      confirmationButtonProps: {
        variant: 'outlined',
        color: 'error'
      },
      cancellationText: 'Cancel'
    }).then(async() => {
      dispatch(logOutEmployerAPI())
    }).catch(() => {})
  }

  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ paddingX: 2, bgcolor: 'white' }}>
        <Grid container spacing={2}>
        <Grid
          xs={12}
          sm={1.8}
          sx={{
            borderRight: '1px solid #e0e0e0', // Màu xám nhẹ chia ranh giới
            minHeight: '100vh', // Cho đường kẻ chạy full chiều cao nếu cần
            bgcolor: 'white' // đảm bảo nền không bị lệch màu
          }}
        >
          <Stack direction="column" spacing={1} sx={{ fontSize: 11 }}>

            <Stack direction="row" alignItems="center" >
            {/* <WorkIcon fontSize="medium" color="primary" /> */}
              <SvgIcon sx={{ color: "white", fontSize:90 }} component={Logo} inheritViewBox />
              <Typography variant="h6" fontWeight="bold" color="primary">
                IT_Jobs
              </Typography>
            </Stack>
              {mainMenus.map(menu => (
                <Box key={menu.key}>
                  <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => toggleMenu(menu.key)}
                  sx={{
                    px: 1,
                    py: 1,
                    cursor: 'pointer'
                  }}
                >
                  <Typography fontWeight="bold" fontSize={14}>{menu.label}</Typography>
                  {openMenus[menu.key] ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </Stack>

                <Collapse in={openMenus[menu.key]} timeout="auto" unmountOnExit>
                  <Stack direction="column" spacing={0.5} sx={{ pl: 1, pt: 1 }}>
                    {menu.items.map(item => (
                      <SidebarItem
                        key={item.key}
                        icon={item.icon}
                        label={item.label}
                        isActive={selectedSection === item.key}
                        onClick={() => {
                          if (item.key === 'logout') {
                            handleLogout();
                          } else {
                            setSelectedSection(item.key);
                          }
                        }}
                        
                      />
                    ))}
                  </Stack>
                </Collapse>

                  
                  
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid xs={12} sm={10.2}>
            <Box p={1}>
            <TopAppBar/>
              {selectedSection === SECTIONS.DASHBOARD && <h2>Dashboard</h2>}
              {selectedSection === SECTIONS.POSTJOB && <JobPost/>}
              {selectedSection === SECTIONS.CV && <h2>CV đã nộp</h2>}
              {selectedSection === SECTIONS.CV_SAVED && <h2>Hồ sơ đã lưu</h2>}
              {selectedSection === SECTIONS.FIND_EMPLOYEE && <h2>Tìm ứng viên mới</h2>}
              {selectedSection === SECTIONS.COMPANY_INFO && <CompanyInfo/>}
              {selectedSection === SECTIONS.ACCOUNT && <h2>Cài đặt</h2>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
