import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Grid } from "swiper";

import 'swiper/css/grid';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { companies } from "~/apis/mockdata";

const Employers = () => {
  return (
    <Box 
      sx={{ 
        width: "90%", 
        alignItems: 'center',
        margin: 'auto',
        textAlign: "center", 
        marginTop: "50px", 
        overflow: 'hidden', 
        height: 'fit-content', // Đổi lại từ 100vh
        bottom: '50px' // Thêm padding-bottom để tạo khoảng cách 10px
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 3, color: 'Black' }}>
        Top Employers ☀️ 
      </Typography>

     
     <Swiper
      modules={[ Pagination, Grid]}
      spaceBetween={15}
      slidesPerView={3} // 4 cột
      grid={{
        rows: 2, // 2 hàng
        fill: "row", // Sắp xếp theo hàng
      }}
      pagination={{ clickable: true }}
      style={{ height: "auto" }} // Đảm bảo chiều cao tự động
    >
    {companies.map((company) => (
    <SwiperSlide key={company.id} style={{  left: '10px' ,display: 'flex', padding: '10px 0 10px 0' }}>
    <Card sx={{ borderRadius: 3, boxShadow: 3, padding: 2, textAlign: "center", maxWidth: 300, height: "100%", display: 'flex', transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": { 
          transform: "scale(1.025)", 
          boxShadow: 5 
    }  }}>
        <Box
          component="img"
          src={company.logo}
          alt={company.name}
          sx={{
            width: 80,
            height: 80,
            objectFit: "contain",
            margin: "auto",
            borderRadius: 2,
            padding: 1,
            background: "#fff",
            boxShadow: 1,
            
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex',flexDirection: 'column' }}> {/* Cho phép nội dung mở rộng */}
         <Typography fontWeight="bold" sx={{ color: 'black' }}>{company.name}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", marginTop: 1,  }}>
          {company.skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ fontSize: 11, color: 'black', fontWeight: 'bold' }} />
        ))}
      </Box>
    </CardContent>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>
    </Box>
  );
};

export default Employers;