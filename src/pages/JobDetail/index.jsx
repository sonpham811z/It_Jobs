import { useEffect, useState } from "react"
import ApplyAndJD from "~/components/JobDetail/applyAndJD"
import CompanyInfoBoard from "~/components/JobDetail/companyInfoBoard"
import Footer from "~/components/HomePages/Footer"
import CustomeAppBar from "~/components/AppBar/AppBar/AppBar.jsx"
import { Box, Divider, Grid } from "@mui/material"
import { useLocation } from "react-router-dom"
import { getJobByIdAPI, getEmployerByIdAPI } from "~/apis"
import { toast } from "react-toastify"
import PageLoading from "~/components/Loading/PageLoading"


function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function JobDetail() {
  // 👉 Auto scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const query = useQuery()
  const jobId = query.get('jobId')
  const employerId = query.get('employerId')
  const [jobData, setJobData] = useState(null)
  const [employerData, setEmployerData] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {

        const [job, employer] = await Promise.all([
          getJobByIdAPI(jobId),
          getEmployerByIdAPI(employerId)
        ])
        setEmployerData(employer.data)
        setJobData(job)
        
      } catch (err) {
        toast.error("Lỗi khi lấy dữ liệu công việc.")
      } 
    }
    if (jobId && employerId) fetchJob()
  }, [jobId, employerId])

  if(!jobData || !employerData)
    return <PageLoading caption={'Loading detail job'}/>
  return (
    <Box
      sx={{
        background: `linear-gradient(to right, #1f1e1e 55%, #911625 100%)top, #f5f5f5 bottom`,
        backgroundSize: "100% 15%, 100% 85%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomeAppBar />
      <Box marginTop={7.5}>
        <Divider sx={{ backgroundColor: "#f5f5f5" }} />
        <Grid container spacing={2} paddingX={16} marginBottom={5}>
          <ApplyAndJD job={jobData} companyData={employerData}/>
          <CompanyInfoBoard companyData={employerData}/>
        </Grid>
      </Box>
      <Footer />
    </Box>
  )
}

export default JobDetail
