import { Box, Typography, Card, Avatar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/80",
    name: "Phạm Thị Hương",
    review: "Ứng dụng ItJobs thực sự là một công cụ tuyệt vời để tìm kiếm việc làm...",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/80",
    name: "Trần Hải Nam",
    review: "ItJobs thật sự là một ứng dụng xuất sắc và không thể thiếu...",
  },
  {
    id: 3,
    avatar: "https://res.cloudinary.com/sonpham811205/image/upload/v1740767880/userAvatar/gojwegzp8cvlddeahyal.jpg",
    name: "SonPham",
    review: "ItJobs là ứng dụng tuyệt vời để giúp tìm kiếm việc làm trong bối cảnh kinh tế khó khăn như hiện nay",
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/80",
    name: "Nguyễn Văn Hoàn",
    review: "Ứng dụng ItJobs là một trong những công cụ tuyệt vời nhất mà tôi đã sử dụng...",
  },
  
];

const UserReviews = () => {
  return (
    <Box sx={{ width: "90%", margin: "auto", textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: 'black', marginBottom: 4 }}>
        User Review ✨
      </Typography>

      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        style={{ paddingBottom: 30 }}
      >
        {reviews.map((user) => (
          <SwiperSlide key={user.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                padding: 3,
                textAlign: "center",
                maxWidth: 180,
                minHeight: 250,
                margin: "auto",
             
              }}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{ width: 80, height: 80, margin: "auto", mb: 1 }}
              />
              <Typography fontWeight="bold"  sx={{color: 'gray'}}>{user.name}</Typography>
              <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                {user.review}
              </Typography>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default UserReviews;
