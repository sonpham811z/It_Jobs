import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  IconButton,
  Chip,
  Link,
  Divider
} from "@mui/material";
import {
  LocationOn,
  Business,
  AccessTime,
  FavoriteBorder
} from "@mui/icons-material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { styled } from "@mui/material/styles"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { formatText, formatDate } from '~/utils/formatter'
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import { sanitizeHTML } from "~/utils/formatter";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"


function ApplyAndJD({job, companyData}) {
    const { user } = useAuth0()
    console.log(user);
    const  navigate = useNavigate()

    

    return (
        <Grid item xs={12} md={8} marginTop={6}>

            {/* About job */}
            <Card sx={{ borderRadius: 2, p: 3 }}>
            <Typography variant="h6" fontWeight="bold">
                {job.title}
            </Typography>
            <Box display="flex" alignItems="center" sx={{marginTop: 1.5, opacity: 0.5}}>
                <Typography variant="body2" sx={{fontWeight: 'bold'}}>{companyData.companyName}</Typography>
                
            </Box>
            <Typography variant="body2" color="success.main" fontWeight="bold" marginTop="5px" sx={{color: '#0ab305'}}>
                ${job.salary.min} – {job.salary.max} $
            </Typography>
            <Box display="flex" alignItems="center" mt={2}>
            <Button
                variant="contained"
                onClick={() =>
                    navigate(
                    `/applyJob?jobId=${job._id}&emailUser=${user.email}&employerId=${companyData._id}`,
                    {
                        state: {
                        jobTitle: job.title,
  
                        }
                    }
                    )
                }
                sx={{ backgroundColor: '#ed1b2f', width: '100%', mr: 1 }}
                >
                Apply now
                </Button>

                <IconButton color="error">
                <FavoriteBorder />
                </IconButton>
            </Box>

                {/* Image section */}
                <Box mt={2}>
                <Swiper spaceBetween={10} slidesPerView={3}>
                {/* {company?.images.map((img, index) => (
                    <SwiperSlide key={index}>
                    <img
                        src={img}
                        alt={`Company image ${index + 1}`}
                        style={{ borderRadius: 8, width: '100%' }}
                    />
                    </SwiperSlide>
                ))} */}
                </Swiper>
            </Box>

            <Box mt={2}>
                {job.locations.map((location, index) => (
                    <Typography key={index} sx={{ fontSize: 14 }}>
                    <LocationOn fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5, opacity: 0.5 }} />
                    <Link
                        href={location.link}
                        underline="none"
                        sx={{
                        fontSize: '0.8rem',
                        color: 'rgba(0, 0, 0, 0.5)',
                        fontWeight: 'bold'
                        }}
                    >
                        {formatText(location)}
                    </Link>
                    </Typography>
                ))}
                </Box>

            <Typography variant="body2" mt={1.5} sx={{
                        fontSize: '0.8rem', 
                        fontWeight: 'bold',
                        color: 'rgba(0, 0, 0, 0.5)', 
                        }}>
                <Business fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} /> {formatText(job.workplace)}
            </Typography>
            <Typography variant="body2" mt={1.5} sx={{
                        fontSize: '0.8rem', 
                        color: 'rgba(0, 0, 0, 0.5)', 
                        fontWeight: 'bold'
                        }}>
                <AccessTime fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} /> Posted on {formatDate(job.createdAt)}
            </Typography>
            <Typography variant="body2" mt={1.5} sx={{
                        fontSize: '0.8rem', 
                        color: 'rgba(0, 0, 0, 0.5)', 
                        fontWeight: 'bold'
                        }}>
                <AccessAlarmOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} /> Deadline {formatDate(job.deadline)}
            </Typography>
            <Typography variant="body2" mt={1.5} sx={{
                        fontSize: '0.8rem', 
                        color: 'rgba(0, 0, 0, 0.5)', 
                        fontWeight: 'bold'
                        }}>
                <BusinessCenterIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} /> {formatText(job.jobType)} 
            </Typography>
            <Box mt={3} display="flex" alignItems="center" gap={2}>
                <Typography sx={{ fontSize: 14, opacity: 0.5, fontWeight: 'bold' }}>Skills</Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                {job.skills.map((skill, index) => (
                    <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                        backgroundColor: "#fff",
                        "& .MuiChip-label": {
                        fontSize: "0.6rem", // Nhỏ hơn mặc định
                        },
                    }}
                    />
                ))}
                </Box>
            </Box>

            </Card>

            {/* Job description and reuire */}
            <Card sx={{ borderRadius: 2, p: 3, mt: 2 }}>
            <Typography variant="h6" fontWeight="bold">
                Job description
            </Typography>
            <Typography
                variant="body2"
                mt={1}
                sx={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(job.jobDescription) }}
                />

            <Divider sx={{ my: 1, opacity: 0.8 }} />

            <Typography variant="h6" fontWeight="bold" mt={2}>
                Your skills and experience
            </Typography>
            <Typography
                variant="body2"
                mt={1}
                sx={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(job.jobRequirement) }}
                />

            </Card>

            {/* Benefits */}
            <Card sx={{ borderRadius: 2, p: 3, mt: 2 }}>
            <Typography variant="h6" fontWeight="bold">
                Why You Love Working Here
            </Typography>
            <Typography
                variant="body2"
                mt={1}
                sx={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(job.benefits) }}
                />
            </Card>
  
      </Grid>
    )
}

export default ApplyAndJD