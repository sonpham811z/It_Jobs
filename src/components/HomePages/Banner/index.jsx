import bannerEmployer from '~/assets/bannerEmployer.jpg'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Box, Button, Typography } from "@mui/material";

export default function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerEmployer})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "300px", // Điều chỉnh chiều cao
        display: "flex",
        alignItems: "center",
        textAlign: "left",
        color: "white",
        padding: "0 5%",
        position: "relative",
        marginTop: 3
      }}
    >
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant="overline" sx={{ fontWeight: "bold", fontSize: "14px" }}>
          DÀNH CHO NHÀ TUYỂN DỤNG
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Bạn có vị trí cần đăng tuyển?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Chúng tôi có những giải pháp tối ưu phù hợp với nhiều loại hình công ty và tiêu chuẩn riêng.
        </Typography>
        <Button variant="contained" startIcon={<BusinessCenterIcon />} color="primary" sx={{ fontWeight: "bold" }}>
          Đăng tin tuyển dụng
        </Button>
      </Box>
    </Box>
  );
}
