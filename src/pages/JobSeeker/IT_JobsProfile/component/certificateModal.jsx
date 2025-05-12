import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const months = [
 "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

const CertificatesModal = ({ open, onClose, onSave }) => {
    const formDataDefault = {
        certificateName: "",
        organization: "",
        issueMonth: "",
        issueYear: "",
        certificateURL: "",
        description: "",
    }
  const [formData, setFormData] = useState(formDataDefault)

  const [errors, setErrors] = useState({
    certificateName: false,
    organization: false,
    issueMonth: false,
    issueYear: false,
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
      certificateName: !formData.certificateName,
      organization: !formData.organization,
      issueMonth: !formData.issueMonth,
      issueYear: !formData.issueYear,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData)
      onClose()
    }
    setFormData(formDataDefault)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Typography variant="h6">Certificates</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="certificateName"
            label="Certificate Name"
            name="certificateName"
            value={formData.certificateName}
            onChange={handleChange}
            error={errors.certificateName}
            helperText={errors.certificateName ? "Certificate Name is required" : ""}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="organization"
            label="Organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            error={errors.organization}
            helperText={errors.organization ? "Organization is required" : ""}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Issue date <span style={{ color: "red" }}>*</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl fullWidth error={errors.issueMonth}>
                  <InputLabel id="issue-month-label">Month</InputLabel>
                  <Select
                    labelId="issue-month-label"
                    id="issueMonth"
                    name="issueMonth"
                    value={formData.issueMonth}
                    label="Month"
                    onChange={handleChange}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth error={errors.issueYear}>
                  <InputLabel id="issue-year-label">Year</InputLabel>
                  <Select
                    labelId="issue-year-label"
                    id="issueYear"
                    name="issueYear"
                    value={formData.issueYear}
                    label="Year"
                    onChange={handleChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <TextField
            margin="normal"
            fullWidth
            id="certificateURL"
            label="Certificate URL"
            name="certificateURL"
            value={formData.certificateURL}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Description
            </Typography>
            <TextField
              id="description"
              name="description"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your certificate..."
            />
          </Box>
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

export default CertificatesModal
