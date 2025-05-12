import Box from "@mui/material/Box";
import { useRef, useEffect } from "react";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { ReactComponent as Logo } from "~/assets/logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import AllJobs from "~/components/AppBar/AppBar/Menus/AllJobs";
import ItCompany from "./Menus/ItCompany";
import AboutUs from "./Menus/AboutUs";
import { toast } from "react-toastify"
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Toolbar} from "@mui/material"
import Profile  from '~/components/AppBar/AppBar/Menus/Profile'
import Notifications  from '~/components/AppBar/AppBar/Menus/Notifications'
import PageLoading from "../../Loading/PageLoading";
import {  Button,  Divider} from "@mui/material";


function CustomeAppBar() {

  const { loginWithRedirect, isAuthenticated, isLoading, user, error } = useAuth0()
  useEffect(() => {
    if (error) {
      toast.error(`Lỗi đăng nhập: ${error.message}`)
    }
  }, [error])
  
  useEffect(() => {
    if (isAuthenticated && !sessionStorage.getItem('loginToastShown')) {
      toast.success("Login Sucess!")
      sessionStorage.setItem('loginToastShown', 'true')
    }
  }, [isAuthenticated])
  
  if (isLoading) {
    return <PageLoading />
  }
  
  const handleLogin = () => {
    loginWithRedirect()
  }
  
  return (
    <AppBar
    position="fixed"
    sx={{
      width: "100%",
      height: (theme) => theme.trello.appBarHeight,
      backgroundImage: "linear-gradient(to right, #1f1e1e 55%, #911625 100%)",
      boxShadow: "none"
    }}
  >
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
      {/* Left Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, textDecoration: "none" }}>
          <SvgIcon sx={{ color: "white", fontSize: 70 }} component={Logo} inheritViewBox />
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            IT_Jobs
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, marginLeft: 3, alignItems: "center" }}>
          <AllJobs />
          <ItCompany />
          <AboutUs />
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isAuthenticated ? (
          <>
            <Button variant="outlined" sx={{ color: "white", borderColor: "white" }} onClick={handleLogin}>
              Login / Register
            </Button>
            <Divider orientation="vertical" flexItem sx={{ border: "1px solid red", height: 24, marginTop: 0.7 }} />
            <Button startIcon={<BusinessCenterIcon />} variant="contained" sx={{ backgroundColor: "black" }}>
              Đăng tuyển & Tìm hồ sơ
            </Button>
          </>
        ) : (
          <>
            <Notifications />
            <Profile />
          </>
        )}
      </Box>
    </Toolbar>
    
  </AppBar>
  );
}

export default CustomeAppBar;
