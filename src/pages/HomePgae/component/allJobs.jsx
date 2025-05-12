"use client"

import { useEffect, useState } from "react"
import { Box, Container, Typography, Paper, Chip, Link } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { getNewJobsAPI } from "~/apis"
import { useNavigate } from "react-router-dom"

// Placeholder logos for companies
const logoPlaceholders = {
  "/vietnam-post-logo.png":
    "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/VoXl7CJvGGXga2JwESdCT7eJKryuAABS_1739787561____39fba99b1611ec16cf64bb0aef102913.png",
  "/famtech-logo.png":
    "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/VoXl7CJvGGXga2JwESdCT7eJKryuAABS_1739787561____39fba99b1611ec16cf64bb0aef102913.png",
  "/cee-logo.png":
    "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/VoXl7CJvGGXga2JwESdCT7eJKryuAABS_1739787561____39fba99b1611ec16cf64bb0aef102913.png",
  "/socotec-logo.png":
    "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/VoXl7CJvGGXga2JwESdCT7eJKryuAABS_1739787561____39fba99b1611ec16cf64bb0aef102913.png",
  "/itechvx-logo.png":
    "https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/VoXl7CJvGGXga2JwESdCT7eJKryuAABS_1739787561____39fba99b1611ec16cf64bb0aef102913.png",
}

// Sample job data - in a real app, this would come from an API


const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  // Simulate API call to fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const data = await getNewJobsAPI()
        setJobs(data)
        setLoading(false)

      } catch (err) {
        setError("Failed to load jobs. Please try again later.")
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const navigate = useNavigate()

  return (
    <Box sx={{ py: 4, bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg">
      <Box sx={{ 
            display: "grid",
            placeItems: "center", // Căn giữa cả chiều ngang và dọc
            mb: 3,
            width: "100%"
            }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ 
                px: 2, 
                color: "black", 
              
                }}
            >
                New Jobs 💥
            </Typography>
            </Box>

        {loading ? (
          // Loading state
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography>Loading jobs...</Typography>
          </Box>
        ) : error ? (
          // Error state
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          // Jobs loaded successfully
          <Box sx={{ position: "relative" }}>
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{
                clickable: true,
               
              }}
              style={{ paddingBottom: 40, paddingTop: 10 }}
             
            >
              {/* Group jobs into slides of 6 */}
              {Array(Math.ceil(jobs.length / 6))
                .fill(0)
                .map((_, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                          md: "1fr 1fr 1fr",
                        },
                        gap: 4,
                      }}
                    >
                      {jobs.slice(slideIndex * 6, slideIndex * 6 + 6).map((job) => (
                        <Paper
                          key={job._id}
                          elevation={0}
                          onClick={() => navigate(`/jobDetail?jobId=${job._id}&employerId=${job.employerId}`)}
                          sx={{
                            p: 2,
                            height: "90%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 2,
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                              transform: "translateY(-5px)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Box sx={{ mr: 2, width: 60, height: 60, flexShrink: 0 }}>
                              <img
                                src={ job.logoURL}
                                alt={`${job.companyName} logo`}
                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                              />
                            </Box>
                            <Box sx={{ overflow: "hidden" }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: "1.1rem",
                                  fontWeight: "bold",
                                  mb: 0.5,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "200px",
                                }}
                                title={job.title} // Show full title on hover
                              >
                                {truncateText(job.title, 25)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: "0.9rem",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: "200px",
                                }}
                                title={job.companyName} // Show full company name on hover
                              >
                                {truncateText(job.companyName, 30)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mt: "auto", display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {job.skills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                sx={{
                                  bgcolor: "#e8f4fc",
                                  color: "#2980b9",
                                  fontSize: "0.75rem",
                                  height: 24,
                                }}
                              />
                            ))}
                          </Box>
                        </Paper>
                      ))}
                    </Box>
                  </SwiperSlide>
                ))}

              {/* Custom pagination and navigation */}
             
       

             
              
            </Swiper>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default JobListings