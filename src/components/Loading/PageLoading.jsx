import { Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as Logo } from "~/assets/logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";


function PageLoading({ caption }) {

    return (
        <Box
        sx={{
          backgroundColor: 'white',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", 
          height: "100vh", 
          gap: 10, 
          
        }}
      >
        {/* Logo + chữ Trello */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <SvgIcon sx={{ color: "#1e88e5",  fontSize: 150  }} component={Logo} inheritViewBox />
          <Typography variant="h4" sx={{ color: "#db2d2a", fontWeight: "bold" }}>
            IT_Jobs
          </Typography>
        </Box>
      
        {/* Loading + caption */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: '90px' }}>
          <CircularProgress />
          {caption}
        </Box>
      </Box>
      
      
    )
}

export default PageLoading;