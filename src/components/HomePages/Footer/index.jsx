import { Box, Typography, Grid, Link, Stack } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Logo } from "~/assets/logo.svg";

const Footer = () => {
  return (
    <Box sx={{ backgroundImage: "linear-gradient(to right, #1f1e1e 55%, #911625 100%)", color: "white", py: 3, px: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Cột 1: Logo và tên ứng dụng */}
        <Grid item xs={12} sm={4}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <SvgIcon sx={{ color: "white", fontSize: 100 }} component={Logo} inheritViewBox />
            <Typography variant="h6" fontWeight="bold">It_Jobs</Typography>
          </Stack>
          <Stack direction="row" spacing={2}  mt={3} sx={{margin: '0 30px 0 15px'}}>
            <Facebook fontSize="small" />
            <Instagram fontSize="small" />
            <LinkedIn fontSize="small" />
            <YouTube fontSize="small" />
            <Twitter fontSize="small" />
            </Stack>
        </Grid>

        {/* Cột 2: Nhà tuyển dụng */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold">Dành cho nhà tuyển dụng</Typography>
          <Stack spacing={1} mt={1}>
            <Link href="#" color="gray" underline="hover">Đăng Tin Tuyển Dụng</Link>
            <Link href="#" color="gray" underline="hover">Tìm Kiếm Hồ Sơ</Link>
            <Link href="#" color="gray" underline="hover">Quản Lý Nhà Tuyển Dụng</Link>
            <Link href="#" color="gray" underline="hover">Thông Báo</Link>
          </Stack>
        </Grid>

        {/* Cột 3: Ứng viên */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold">Dành cho ứng viên</Typography>
          <Stack spacing={1} mt={1}>
            <Link href="#" color="gray" underline="hover">Việc Làm</Link>
            <Link href="#" color="gray" underline="hover">Công Ty</Link>
            <Link href="#" color="gray" underline="hover">Quản Lý Ứng Viên</Link>
            <Link href="#" color="gray" underline="hover">Thông Báo</Link>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ borderTop: "1px solid white", mt: 3, pt: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ fontSize: 12, fontWeight:'bold', color:'gray' }}>
          Copyright @ SonPham UIT
        </Typography>
      </Box>
      
    </Box>
  );
};

export default Footer;