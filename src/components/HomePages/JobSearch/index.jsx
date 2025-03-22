import { Box, Button, TextField, Select, MenuItem, InputAdornment, Typography, Chip, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const skills = ["Java", "ReactJS", ".NET", "PHP", "NodeJS", "Python", "ReactJs"];
const cities = ["All Cities","Ha Noi", "Da Nang", "Ho Chi Minh", "Nam Dinh", "Dong Nai", "Binh Duong", "Bac Giang"]

export default function JobSearchBar() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "65px 0px 40px 0px",
        backgroundImage: "linear-gradient(to right, #1f1e1e 55%, #911625 100%)",

        color: "white",
      }}
    >
      <Container maxWidth="lg">
        {/* Tiêu đề */}
        <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{marginBottom: '20px'}}>
          1,067 IT Jobs For <span style={{ color: "#FFD700" }}>"Chất"</span> Developers
        </Typography>

        {/* Thanh tìm kiếm */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mt: 3, maxWidth: "900px", margin: "0 auto" }}>
          {/* Dropdown chọn thành phố */}
          <Select
            defaultValue="All Cities"
            startAdornment={<LocationOnIcon sx={{ color: "gray", marginLeft: 0.5}} />}
            sx={{ width: 200, background: "white", borderRadius: "5px" , color: 'black', fontWeight: 'bold'}}
          >
            {cities.map((value, index) => (
              <MenuItem key={index} value={value}  sx={{ color: "black" }}>{value}</MenuItem>
            ))}
           
          </Select>


          {/* Ô nhập từ khóa tìm kiếm */}
          <TextField
              fullWidth
              placeholder="Enter keyword skill (Java, Python, .Net, ...)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                style: { color: "black" }, // Màu chữ khi nhập
              }}
              sx={{
                background: "white",
                borderRadius: "5px",
                "& .MuiInputBase-input::placeholder": {
                  color: "grey", // Màu placeholder
                },
              }}
            />


          {/* Nút tìm kiếm */}
          <Button variant="contained" sx={{ backgroundColor: "#D32F2F", color: "white", px: 6 }}>
            <SearchIcon sx={{ mr: 1 }} /> Search
          </Button>
        </Box>

        {/* Danh sách gợi ý kỹ năng */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="subtitle1" sx={{ color: "#ccc" }}>Suggestions for you:</Typography>
          {skills.map((skill, index) => (
            <Chip key={index} label={skill} sx={{ backgroundColor: "black", color: "white" }} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
