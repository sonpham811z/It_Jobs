"use client"
import { Box, Container, Typography, Button, Paper, Grid, Divider, Link } from "@mui/material"
import {
  Language as LanguageIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material"
import CustomeAppBar from "~/components/AppBar/AppBar/AppBar"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddAlertIcon from '@mui/icons-material/AddAlert';


const CompanyProfile = () => {
  return (
    <>
    <CustomeAppBar/>

    <Box bgcolor={"whitesmoke"}>
      <Container sx={{ py: 14 }}>
        {/* Company Banner and Logo */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          {/* Banner */}
          <Box
            sx={{
              height: 200,
              background: "linear-gradient(90deg, rgba(0,59,36,1) 0%, rgba(9,121,75,1) 35%, rgba(0,212,97,1) 100%)",
              position: "relative",
              backgroundImage: `url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>

          {/* Logo and Company Name */}
          <Box sx={{ px: 3, py: 3, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: -60,
                left: 30,
                width: 140,
                height: 140,
                bgcolor: "white",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-co-phan-vien-thong-fpt-8ed1eb2208b43a0c33a229ae6d6c0933-65d454f5c49b1.jpg"
                alt="STEI Institute Logo"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
              />
            </Box>

            <Box sx={{ ml: 21, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#121212" }}>
                  CÔNG TY TRÁCH NHIỆM HỮU HẠN STEI INSTITUTE
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LanguageIcon sx={{ fontSize: 18, color: "#121212", mr: 0.5 }} />
                  <Link href="https://stei.edu.vn/" target="_blank" sx={{ color: "#222423", mr: 3 }}>
                    https://stei.edu.vn/
                  </Link>

                  <LinkedInIcon sx={{ fontSize: 18, color: "#121212", mr: 0.5 }} />
                  <Link href="https://stei.edu.vn/" target="_blank" sx={{ color: "#222423", mr: 3 }}>
                    https://stei.edu.vn/
                  </Link>
                  
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddAlertIcon />}
                sx={{
                  bgcolor: "white",
                  color: "#00a86b",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                  textTransform: "none",
                }}
              >
                Theo dõi công ty
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Main Content - General Information and Contact Information side by side */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* General Information Section */}
          <Grid item xs={12} md={8.5}>
                 
                 <Paper elevation={0} sx={{ borderRadius: 2, p: 4,borderTop: "5px solid #ab261a",  }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                General information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} gutterBottom>
                    Company type
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    IT Product
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} gutterBottom>
                    Company industry
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    IT Services 
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} gutterBottom>
                    Company size
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    51-150 employees
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body2" sx={{ color: "#a6a6a6" }} gutterBottom>
                        Country
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                        component="img"
                        src="https://flagcdn.com/w40/vn.png"
                        alt="Japan Flag"
                        sx={{
                            width: 24,
                            height: 16,
                            borderRadius: "2px",
                            objectFit: "cover",
                            mr: 1,
                        }}
                        />
                        <Typography variant="body1" fontWeight="medium">
                            Viet Nam
                        </Typography>
                    </Box>
                    </Grid>

 
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" sx={{ color: "#a6a6a6" }} gutterBottom>
                    Overtime policy
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    No OT
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            p: 3,
            borderTop: "5px solid #ab261a",
            marginTop: '23px'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Giới thiệu công ty
          </Typography>
          <Typography variant="body1" paragraph>
            Học viện STEI là tên mới của Học viện STET danh tiếng ngày trước. Mặc dù đổi tên và có thương hiệu mới nhưng
            chúng tôi vẫn giữ lại một số đặc điểm nhận diện từ STET, đó là kiểu chữ và tông màu đen nguyên bản trong
            biểu tượng.
          </Typography>
          <Typography variant="body1" paragraph>
            "Đảo chấm đỏ nhỏ" đại diện cho Singapore, đất nước nơi công ty chúng tôi đặt nền móng và phát triển, tạo
            dựng uy tín và danh tiếng như ngày nay.
          </Typography>
          <Typography variant="body1" paragraph>
            Chữ "T" cách điệu tạo nên sự chuyển động trong biểu tượng, tương trưng cho lối sống năng động của Học viện
            STEI. Với thiết kế cách điệu, hòa cùng màu xanh, chữ "I" còn thường được sử dụng như một biểu tượng thông
            tin phổ biến tại nhiều nơi.
          </Typography>
          <Typography variant="body1">
            Với những ý nghĩa phản ánh trong logo, Học viện STEI được nhận diện là một tổ chức giáo dục giảng dạy công
            nghệ thông tin hiện đại, năng động và luôn cập nhật những xu hướng mới nhất.
          </Typography>
        </Paper>
          </Grid>

          {/* Contact Information - Moved up to be side by side with General Information */}
          <Grid item xs={12} md={3.5}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                p: 3,
                height: "100%",
                 borderTop: "5px solid #ab261a",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Thông tin liên hệ
              </Typography>

              {/* Representative */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PersonIcon sx={{ color: "#ab261a", mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold" fontSize={'15px'} sx={{color: '#a6a6a6'}}>
                    Người đại diện
                  </Typography>
                </Box>
                <Typography sx={{ ml: 4, fontSize: '13.5px' }}>
                  Nguyễn Văn Anh
                </Typography>
              </Box>

              {/* Work Email */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon sx={{ color: "#ab261a", mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold" fontSize={'15px'} sx={{color: '#a6a6a6'}}>
                    Work Email
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4,  fontSize: '13.5px' }}>
                  contact@stei.edu.vn
                </Typography>
              </Box>

              {/* Phone Number */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon sx={{ color: "#ab261a", mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold" fontSize={'15px'} sx={{color: '#a6a6a6'}}>
                    Phone Number
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 ,  fontSize: '13.5px'}}>
                  +84 236 3655 777
                </Typography>
              </Box>

              {/* Company Address */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOnIcon sx={{ color: "#ab261a", mr: 1 }} />
                  <Typography variant="body2" fontWeight="bold" fontSize={'15px'} sx={{color: '#a6a6a6'}}>
                    Địa chỉ công ty
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 ,  fontSize: '13.5px'}}>
                  Tầng 3, Tòa nhà Diamond Time Complex, Số 35 Thái Phiên, Phường Phước Ninh, Quận Hải Châu, Thành phố Đà
                  Nẵng, Việt Nam
                </Typography>
              </Box>

              {/* Map */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  Xem bản đồ
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                    backgroundImage: `url('https://via.placeholder.com/600x300?text=Map+of+Diamond+Time+Complex')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Company Introduction */}
       
      </Container>
    </Box>
    </>
  )
}

export default CompanyProfile
