import {
  Box,
  Grid,
  Card,
  Typography,
  Link,
  Divider 
} from "@mui/material";
import { jobs, corporation } from "~/apis/mockdata";
import LaunchIcon from '@mui/icons-material/Launch';
import { getCountryCode } from "~/utils/flagCountry";

function CompanyInfoBoard({companyData}) {
    const jobDetail = jobs[0]; // Lấy công việc đầu tiên trong mock data
    const company = corporation.find((c) => c._id === jobDetail.companyId);
    
    return (
        <Grid item xs={12} md={4} marginTop={6}>
            <Card sx={{ borderRadius: 2, p: 3 }}>
                <Box display="flex" alignItems="center">
                    <img src={companyData.logoURL} alt={companyData.companyName} style={{ width: 80, height: 80 }} />
                    <Box display="flex" flexDirection="column" sx={{ml: 3}}>
                    <Typography sx={{fontSize: '15px', fontWeight: 'bold'}} >
                        {companyData.companyName}
                    </Typography>
                    <Link
                        href={company.link}
                        underline="none"
                        color="#0e2eed"
                        sx={{
                            fontSize: "12px",
                            display: "inline-flex",
                            alignItems: "center",
                            mt: '5px'
                        }}
                        >
                        View company
                        <LaunchIcon sx={{ ml: '5px', fontSize: '16px' }} />
                        </Link>

                    
                    </Box>
                </Box>
            <Typography variant="body2" mt={2}>{companyData.companyTitle}</Typography>

        <Box mt={5} ml={1}>
            <Grid container spacing={1}>
            {[
                { label: "Company type", value: companyData.industry },
                { label: "Company size", value: `${companyData.companySize} workers`  },
                { 
                label: "Country", 
                value: (
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <img 
                        src={`https://flagcdn.com/w40/${getCountryCode(companyData.companyCountry)}.png`} 
                        alt={companyData.companyCountry} 
                        width="20" 
                        height="15" 
                        style={{ marginRight: 8 }}
                    />
                    {company.country}
                    </Box>
                ) 
                },
                { label: "Working days", value: `${companyData.workDaysStart}-${companyData.workDaysEnd}` },
                { label: "Overtime policy", value: companyData.overtimeRequired ? 'Extra salary for OT' : 'No OT' }
                    ].map((item, index) => (
                <Grid container key={index}>
                <Grid item xs={6}>
                    <Typography variant="subtitle2" sx={{ color: "gray" }}>{item.label}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" sx={{ textAlign: "right" }}>{item.value}</Typography>
                </Grid>
                {index < 4 && ( // Thêm Divider giữa các mục, trừ mục cuối
                    <Grid item xs={12}>
                    <Divider sx={{ my: 1, opacity: 0.8 }} />
                    </Grid>
                )}
                </Grid>
            ))}
            </Grid>
        </Box>
            </Card>
        </Grid>   
    )
}

export default CompanyInfoBoard