"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useSelector } from "react-redux"
import { selectCurrentEmployer } from "~/redux/employer/employerSlice"
import RichTextEditor from "~/components/RichTextEditor/RichTextEditor"
import { useDispatch } from "react-redux"
import { updateEmployerAPI } from "~/redux/employer/employerSlice"
import { toast } from "react-toastify"
import { singleFileValidator } from "~/utils/validators"

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

const CountrySelect = ({ value, onChange }) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.map((c) => c.name.common).sort()
        setCountries(countryNames)
      })
      .catch((err) => console.error("Failed to load countries:", err))
  }, [])

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel sx={{ color: "gray" }}>Quốc gia</InputLabel>
      <Select value={value} label="Quốc gia" onChange={(e) => onChange(e.target.value)} sx={{ color: "black" }}>
        {countries.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

// Tab Panel Component
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ mt: 2 }}>{children}</Box>}</div>
}

const JobPostingForm = () => {
  const currentEmployer = useSelector(selectCurrentEmployer)
  const [tabIndex, setTabIndex] = useState(0)
  const [form, setForm] = useState({
    companyName: "",
    companySize: "",
    industry: "",
    companyURL: "",
    linkedin: "",
    fullName: "",
    phoneNumber: "",
    position: "",
    workEmail: "",
    companyLocation: "",
    companyCountry: "",
    companyAddress: "",
    companyDescription: "",
    workDaysStart: "",
    workDaysEnd: "",
    overtimeRequired: false,
    companyTitle: "",
  })

  useEffect(() => {
    if (currentEmployer) {
      setForm((prev) => ({
        ...prev,
        companyName: currentEmployer.companyName || "",
        fullName: currentEmployer.fullName || "",
        phoneNumber: currentEmployer.phoneNumber || "",
        position: currentEmployer.position || "",
        workEmail: currentEmployer.workEmail || "",
        companyLocation: currentEmployer.companyLocation || "",
        companyCountry: currentEmployer.companyCountry || "",
        companyURL: currentEmployer.companyURL || "",
        companySize: currentEmployer.companySize || "",
        industry: currentEmployer.industry || "",
        companyAddress: currentEmployer.companyAddress || "",
        linkedin: currentEmployer.linkedin || "",
        companyDescription: currentEmployer.companyDescription || "",
        workDaysStart: currentEmployer.workDaysStart || "",
        workDaysEnd: currentEmployer.workDaysEnd || "",
        overtimeRequired: currentEmployer.overtimeRequired || false,
        companyTitle: currentEmployer.companyTitle || "",
      }))
    }
  }, [currentEmployer])

  const dispatch = useDispatch()
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    toast
      .promise(dispatch(updateEmployerAPI(form)), {
        pending: "Updatting",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Update company informatiton successfully")
        }
      })
  }

  const uploadLogo = (e) => {
    console.log(e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])

    if (error) {
      toast.error(error)
    }

    const reqData = new FormData()
    reqData.append("logo", e.target?.files[0])
    console.log(reqData)

    for (const value of reqData.values()) console.log("value", value)

    toast
      .promise(dispatch(updateEmployerAPI(reqData)), {
        pending: "Uploading...",
      })
      .then(() => {
        e.target.value = ""
      })
  }

  const uploadBackground = (e) => {
    console.log(e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])

    if (error) {
      toast.error(error)
    }

    const reqData = new FormData()
    reqData.append("background", e.target?.files[0])
    console.log(reqData)

    for (const value of reqData.values()) console.log("value", value)

    toast
      .promise(dispatch(updateEmployerAPI(reqData)), {
        pending: "Uploading...",
      })
      .then(() => {
        e.target.value = ""
      })
  }

  return (
    <Box sx={{ px: 5, mx: "auto", bgcolor: "white", boxShadow: 3, marginTop: 2, paddingBottom: 2 }}>
      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
        <Tab label="Thông tin công ty" />
        <Tab label="Đa phương tiện" />
      </Tabs>

      {/* Tab 1: Thông tin công ty */}
      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ display: "flex", justifyContent: "space-around", mb: 4, mt: 6 }}>
          {/* Logo công ty */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={currentEmployer.logoURL}
              alt="Logo"
              sx={{
                width: 140,
                height: 140,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            />
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
              <Button component="label" variant="outlined" size="small">
                Thay logo
                <VisuallyHiddenInput type="file" onChange={uploadLogo} />
              </Button>
            </Box>
          </Box>

          {/* Ảnh bìa hiện tại */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={currentEmployer.backgroundURL}
              alt="Ảnh bìa"
              sx={{
                width: 350,
                height: 140,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            />
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" size="small" component="label">
                Thay ảnh bìa
                <VisuallyHiddenInput type="file" onChange={uploadBackground} />
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography sx={{ color: "grey", paddingBottom: "16px", fontSize: "16", fontWeight: "bold" }} gutterBottom>
          Thông tin công ty
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Tên công ty *"
              fullWidth
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Khẩu hiệu công ty"
              fullWidth
              value={form.companyTitle}
              onChange={(e) => handleChange("companyTitle", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <CountrySelect value={form.companyCountry} onChange={(val) => handleChange("companyCountry", val)} />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "gray" }}>Ngày làm việc (bắt đầu)</InputLabel>
              <Select
                value={form.workDaysStart}
                label="Ngày làm việc (bắt đầu)"
                onChange={(e) => handleChange("workDaysStart", e.target.value)}
                sx={{ color: "black" }}
              >
                <MenuItem value="Monday">Thứ Hai</MenuItem>
                <MenuItem value="Tuesday">Thứ Ba</MenuItem>
                <MenuItem value="Wednesday">Thứ Tư</MenuItem>
                <MenuItem value="Thursday">Thứ Năm</MenuItem>
                <MenuItem value="Friday">Thứ Sáu</MenuItem>
                <MenuItem value="Saturday">Thứ Bảy</MenuItem>
                <MenuItem value="Sunday">Chủ Nhật</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "gray" }}>Ngày làm việc (kết thúc)</InputLabel>
              <Select
                value={form.workDaysEnd}
                label="Ngày làm việc (kết thúc)"
                onChange={(e) => handleChange("workDaysEnd", e.target.value)}
                sx={{ color: "black" }}
              >
                <MenuItem value="Monday">Thứ Hai</MenuItem>
                <MenuItem value="Tuesday">Thứ Ba</MenuItem>
                <MenuItem value="Wednesday">Thứ Tư</MenuItem>
                <MenuItem value="Thursday">Thứ Năm</MenuItem>
                <MenuItem value="Friday">Thứ Sáu</MenuItem>
                <MenuItem value="Saturday">Thứ Bảy</MenuItem>
                <MenuItem value="Sunday">Chủ Nhật</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "gray" }}>Quy mô công ty (số nhân viên)</InputLabel>
              <Select
                value={form.companySize}
                label="Quy mô công ty (số nhân viên)"
                onChange={(e) => handleChange("companySize", e.target.value)}
                sx={{ color: "black" }} // tuỳ chỉnh màu chữ nếu cần
              >
                <MenuItem value="1-50">1-50 nhân viên</MenuItem>
                <MenuItem value="50-100">50-100 nhân viên</MenuItem>
                <MenuItem value="101-500">100-500 nhân viên</MenuItem>
                <MenuItem value="501-1000">500-1000 nhân viên</MenuItem>
                <MenuItem value="1000+">1000-2000 nhân viên</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "gray" }}>Lĩnh vực hoạt động</InputLabel>
              <Select
                value={form.industry}
                label="Lĩnh vực hoạt động"
                onChange={(e) => handleChange("industry", e.target.value)}
                sx={{ color: "black" }}
              >
                <MenuItem value="IT Consultant">IT Consultant</MenuItem>
                <MenuItem value="IT Production">IT Production</MenuItem>
                <MenuItem value="E-commerce">E-commerce</MenuItem>
                <MenuItem value="Fintech">Fintech</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
              </Select>
            </FormControl>

            
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Website công ty"
              fullWidth
              value={form.companyURL}
              onChange={(e) => handleChange("companyURL", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="LinkedIn"
              fullWidth
              value={form.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Địa điểm công ty"
              fullWidth
              value={form.companyLocation}
              onChange={(e) => handleChange("companyLocation", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Địa chỉ chi tiết công ty (phường, quận, huyện,..)"
              fullWidth
              value={form.companyAddress}
              onChange={(e) => handleChange("companyAddress", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, ml: 0.5 }}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.overtimeRequired}
                    onChange={(e) => handleChange("overtimeRequired", e.target.checked)}
                  />
                }
                label="Yêu cầu làm thêm giờ (OT)"
              />
            </FormGroup>
          </Grid>
        </Grid>
        </Grid>

        <Typography
          sx={{ color: "grey", paddingBottom: "16px", paddingTop: "45px", fontSize: "16", fontWeight: "bold" }}
          gutterBottom
        >
          Người đại diện
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Người liên hệ"
              fullWidth
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email công việc"
              fullWidth
              value={form.workEmail}
              onChange={(e) => handleChange("workEmail", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Vị trí công tác"
              fullWidth
              value={form.position}
              onChange={(e) => handleChange("position", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại liên hệ"
              fullWidth
              value={form.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              InputLabelProps={{ sx: { color: "gray" } }}
            />
          </Grid>
        </Grid>

        <Typography
          sx={{ color: "grey", paddingBottom: "12px", paddingTop: "45px", fontSize: "16", fontWeight: "bold" }}
        >
          Giới thiệu công ty
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RichTextEditor
              value={form.companyDescription}
              onChange={(value) => handleChange("companyDescription", value)}
            />
          </Grid>
        </Grid>

        

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </Box>
      </TabPanel>

      {/* Tab 2: Đa phương tiện */}
      <TabPanel value={tabIndex} index={1}>
        <Typography>Đa phương tiện đã</Typography>
      </TabPanel>
    </Box>
  )
}

export default JobPostingForm
