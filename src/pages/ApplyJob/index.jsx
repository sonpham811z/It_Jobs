"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Paper,
  Select,
  MenuItem,
  FormHelperText,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { styled } from "@mui/material/styles"
import { useAuth0 } from "@auth0/auth0-react"
import { singleFileValidator } from "~/utils/validators";
import { toast } from "react-toastify";
import { applyNewJob } from "~/apis";
import { useLocation, useSearchParams } from "react-router-dom"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    error: {
      main: "#ff4d4f",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f5f5",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        containedError: {
          color: "#fff",
        },
      },
    },
  },
})

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const JobApplication = () => {

  const location = useLocation()
  const [searchParams] = useSearchParams()
  const jobTitle = location.state?.jobTitle

  const jobId = searchParams.get('jobId')
  const email = searchParams.get('emailUser')
  const employerId = searchParams.get('employerId')

  const { user } = useAuth0()
  const [formData, setFormData] = useState({
    cvOption: "current",
    fullName: user.name,
    phoneNumber: '01234567',
    preferredLocation: "TP Hồ Chí Minh",
  })

  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear validation errors when field is filled
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
      e.target.value = null;
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName) {
      newErrors.fullName = true
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = true
    }

    if (!formData.preferredLocation) {
      newErrors.preferredLocation = true
    }

    if (formData.cvOption === "upload" && !file) {
      newErrors.file = true
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!validate()) return
  
    // Nếu người dùng chọn upload CV
    if (formData.cvOption === "upload" && file) {
      const error = singleFileValidator(file)
      if (error) {
        toast.error(error)
        return
      }
    }
      const reqData = new FormData()
      reqData.append('cv', file)
      reqData.append('email', email)
      reqData.append('employerId', employerId)
      reqData.append('jobId', jobId)
      reqData.append('fullName', user.name)
      reqData.append('phoneNumber', formData.phoneNumber)

      toast.promise(
        applyNewJob(reqData), {
          pending: 'Sending CV',
          success: 'Apply successfully'
        }
      ).catch(() => {})
  
      // try {
      //   const response = await axios.post('/api/upload-cv', reqData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      //   toast.success("CV uploaded successfully!")
      // } catch (err) {
      //   toast.error("Upload failed.")
      //   return
      // }

    }
  

  
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(to right, #1f1e1e 55%, #911625 100%)top, #f5f5f5 bottom`,
          backgroundSize: "100% 30%, 100% 70%",
          backgroundRepeat: "no-repeat",
          padding: 0,
          margin: 0,
        }}
      >
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ py: 2, display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "white", mr: 1 }} onClick={() => console.log("Back button clicked")}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
              Back
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 0.5,
                  }}
                >
                  it
                </Box>
                viec
              </Typography>
            </Box>
          </Box>

          {/* Main Content */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              mb: 4,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            {jobTitle}
            </Typography>

            {/* CV Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Your CV{" "}
                <Box component="span" sx={{ color: "red" }}>
                  *
                </Box>
              </Typography>

              <RadioGroup name="cvOption" value={formData.cvOption} onChange={handleChange}>
                <FormControlLabel
                  value="current"
                  control={<Radio color="error" />}
                  label={
                    <Box>
                      <Typography variant="body1" ml={1} mb={1}>Use your current CV</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                        <Typography variant="body2" sx={{color: '#0e2eed'}}>
                          Template (1).docx
                        </Typography>
                        <CheckCircleIcon sx={{ color: "primary.main", ml: 1, fontSize: 16 }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        Upload date: 25-04-2025
                      </Typography>
                    </Box>
                  }
                  sx={{
                    border: "1px solid #ffcccc",
                    borderRadius: 1,
                    p: 1,
                    mb: 1,
                    width: "100%",
                    bgcolor: "#fff5f5",
                  }}
                />

                <FormControlLabel
                  value="upload"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1" ml={1}>Upload a new CV</Typography>
                      <Box sx={{ mt: 1 }} ml={1}>
                        <Button
                          variant="outlined"
                          startIcon={<FileUploadIcon />}
                          component="label"
                          sx={{
                            textTransform: "none",
                            mr: 2,
                            borderColor: "#ddd",
                            color: "error.main",
                          }}
                        >
                          Choose file
                          <input type="file" hidden onChange={handleFileChange} accept=".doc,.docx,.pdf" />
                        </Button>
                        <Typography variant="body2" component="span" color="text.secondary">
                          {file ? file.name : "No file chosen"}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{color : '#a6a6a6 '}} ml={1}>
                        Please upload a .doc, .docx, or .pdf file, maximum 3MB and no password protection
                      </Typography>
                    </Box>
                  }
                  sx={{
                    border: "1px solid #eee",
                    borderRadius: 1,
                    p: 1,
                    width: "100%",
                  }}
                />
              </RadioGroup>
              {errors.file && <FormHelperText error>Please upload your CV</FormHelperText>}
            </Box>

            {/* Personal Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
                Personal information
              </Typography>

              <Box sx={{ mb: 2 }}>
                  
                  <Typography variant="body2" sx={{ mb: 0.5, color: '#a6a6a6' }} >
                  Full name{" "}
                  <Box component="span" sx={{ color: "red" }}>
                    *
                  </Box>
                </Typography>
                <TextField
                  fullWidth
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  helperText={errors.fullName ? "Full name is required" : ""}
                  variant="outlined"
                  size="small"

                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5, color: '#a6a6a6' }}>
                  Phone number{" "}
                  <Box component="span" sx={{ color: "red" }}>
                    *
                  </Box>
                </Typography>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  helperText={errors.phoneNumber ? "Phone number is required" : ""}
                  variant="outlined"
                  size="small"
                 
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5, color: '#a6a6a6' }}>
                  Preferred work location{" "}
                  <Box component="span" sx={{ color: "red" }}>
                    *
                  </Box>
                </Typography>
                <FormControl fullWidth error={errors.preferredLocation}>
                  <Select
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    displayEmpty
                    size="small"
                    IconComponent={() => (
                      <Box sx={{ position: "absolute", right: 8, top: "calc(50% - 12px)" }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                        </svg>
                      </Box>
                    )}
                  >
                    <MenuItem value="TP Hồ Chí Minh">TP Hồ Chí Minh</MenuItem>
                    <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                    <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
                    <MenuItem value="Cần Thơ">Đà Nẵng</MenuItem>
                    <MenuItem value="Huế">Huế</MenuItem>
                    <MenuItem value="Nha Trang">Nha Trang</MenuItem>
                  </Select>
                 
                </FormControl>
              </Box>
            </Box>

            {/* Send CV Button */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                    width: '100%',
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                    background:"#ed1b2f",
                    '&:hover' : {
                        backgroundColor: '#c82222'
                    }
                }}
              >
                Send my CV
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default JobApplication
