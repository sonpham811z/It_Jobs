import { Box } from "@mui/material"
import { ReactComponent as logo } from "~/assets/logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";


function VerifyAgain() {

    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", 
          height: "100vh", 
          gap: 10, 
          
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <SvgIcon sx={{ color: "primary.main",  fontSize: 70  }} component={logo} inheritViewBox />
          <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
            IT_Jobs
          </Typography>
        </Box>
      
        {/* Loading + caption */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: '90px' }}>
          
          Your Link is expired, Please register again
        </Box>
      </Box>
      
      
    )
}

export default VerifyAgain;