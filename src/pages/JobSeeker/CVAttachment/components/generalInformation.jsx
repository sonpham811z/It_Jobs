import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  Grid,
  FormHelperText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

// Sample data for dropdowns
const experienceYears = ["1 year", "2 years", "3 years", "4 years", "5 years", "6+ years", "10+ years"]
const jobLevels = ["Intern", "Junior", "Middle", "Senior", "Lead", "Manager", "Director", "C-Level"]
const workingModels = ["Remote", "Hybrid", "At office"]
const industries = [
  "Apparel and Fashion",
  "Information Technology",
  "Financial Services",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Media and Entertainment",
  "Telecommunications",
  "Transportation and Logistics",
]
const currencies = ["VND", "USD", "EUR", "GBP", "JPY", "SGD"]

const GeneralInformationModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    currentJobLevel: "",
    expectedWorkingModel: "",
    expectedSalaryCurrency: "VND",
    expectedSalaryMin: "",
    expectedSalaryMax: "",
  })

  const [errors, setErrors] = useState({
    yearsOfExperience: false,
    currentJobLevel: false,
    expectedWorkingModel: false,
    expectedSalaryMin: false,
    expectedSalaryMax: false,
  })

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

  const validate = () => {
    const newErrors = {
      yearsOfExperience: !formData.yearsOfExperience,
      currentJobLevel: !formData.currentJobLevel,
      expectedWorkingModel: !formData.expectedWorkingModel,
      expectedSalaryMin: !formData.expectedSalaryMin,
      expectedSalaryMax: !formData.expectedSalaryMax,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6">General Information</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Total years of experience <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth error={errors.yearsOfExperience}>
              <Select
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Select years of experience</em>
                  }
                  return selected
                }}
              >
                <MenuItem disabled value="">
                  <em>Select years of experience</em>
                </MenuItem>
                {experienceYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.yearsOfExperience && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Current job level <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth error={errors.currentJobLevel}>
              <Select
                id="currentJobLevel"
                name="currentJobLevel"
                value={formData.currentJobLevel}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Select job level</em>
                  }
                  return selected
                }}
              >
                <MenuItem disabled value="">
                  <em>Select job level</em>
                </MenuItem>
                {jobLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
              {errors.currentJobLevel && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Expected working model <span style={{ color: "red" }}>*</span>
            </Typography>
            <FormControl fullWidth error={errors.expectedWorkingModel}>
              <Select
                id="expectedWorkingModel"
                name="expectedWorkingModel"
                value={formData.expectedWorkingModel}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Select working model</em>
                  }
                  return selected
                }}
              >
                <MenuItem disabled value="">
                  <em>Select working model</em>
                </MenuItem>
                {workingModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
              {errors.expectedWorkingModel && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
          </Box>

        

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Expected salary (per month) <span style={{ color: "red" }}>*</span>
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <Select
                      id="expectedSalaryCurrency"
                      name="expectedSalaryCurrency"
                      value={formData.expectedSalaryCurrency}
                      onChange={handleChange}
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4.5}>
                  <TextField
                    fullWidth
                    id="expectedSalaryMin"
                    name="expectedSalaryMin"
                    value={formData.expectedSalaryMin}
                    onChange={handleChange}
                    placeholder="2,000"
                    error={errors.expectedSalaryMin}
                    InputProps={{
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
                <Grid item xs={0.5} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography>-</Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="expectedSalaryMax"
                    name="expectedSalaryMax"
                    value={formData.expectedSalaryMax}
                    onChange={handleChange}
                    placeholder="2,500"
                    error={errors.expectedSalaryMax}
                    InputProps={{
                      inputMode: "numeric",
                    }}
                  />
                </Grid>
              </Grid>
              {(errors.expectedSalaryMin || errors.expectedSalaryMax) && (
                <FormHelperText error>Expected salary range is required</FormHelperText>
              )}
            </Grid>

            
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="error" sx={{ minWidth: 100 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GeneralInformationModal