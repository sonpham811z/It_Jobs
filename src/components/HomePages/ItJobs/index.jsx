
import { Box, Typography, Card, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from'swiper';
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { itJobsData } from "~/apis/mockdata";


const JobHighlight = () => {
  return (
    <Box sx={{ background: "linear-gradient(295.89deg,rgb(250, 51, 16) -101.99%, #fffdf9 102.52%)", paddingBottom: 5 }}>
      <Box sx={{ width: "90%", margin: "auto", textAlign: "center", marginTop: "50px",  bottom: '50px'}}>
      <Typography variant="h4" fontWeight="bold" sx={{ padding: '30px 0 30px 0', color: "black" }}>
      Featured  Jobs
        🔥 
      </Typography>

      <Swiper
        
        spaceBetween={20}
        centeredSlides={false}
        slidesPerView={3}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        style={{ height: "auto" }}
      >
        {itJobsData.map((job) => (
          <SwiperSlide key={job.id} style={{ left: '15px',padding: '10px 0 10px 0' }}>
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 3,
                padding: 2,
                textAlign: "center",
                maxWidth: 300,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <Box  alignItems="center">
                <Box
                  component="img"
                  src={job.companyLogo}
                  alt={job.companyName}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                    marginRight: 2,
                    borderRadius: 1,
                    color: 'black',
                    alignContent: 'center'
                  }}
                />
                <Box >
                  <Typography variant="body3" color="gray" sx={{color: "grey"}}>
                    {job.companyName}
                  </Typography>
                  <Typography fontWeight="bold" sx={{color: "black", marginTop:'4px'}}>{job.jobTitle}</Typography>
                </Box>
              </Box>

              <Box  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, justifyContent: 'center', marginTop: 2}}>
                {job.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant='outlined' color= 'primary' sx={{ fontSize: 11, color: "#f87760", fontWeight: "bold" }} />
                ))}
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
     </Box>   
   
  );
};

export default JobHighlight;
