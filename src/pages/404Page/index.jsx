import { Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import notFoundImg from "~/assets/notfound.png";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        display: "flex",
        backgroundColor: 'white',
        flexDirection: "column",
        gap: 2,
      }}
    >
      <img src={notFoundImg} alt="Not Found"/>
      <Link to="/">
        <Button
          startIcon={<HomeIcon />}
          variant="outlined"
          size="large"
          onClick={handleBackHome}
          sx={{ textTransform: "none", 
              color: "black",
              borderColor: "black",
              "&:hover": {
                  backgroundColor: "#e8e8e8",
                  borderColor: "black",
              }

          }}
        >
          Back Home
        </Button>
      </Link>
      
    </Box>
  );
};

export default NotFoundPage;
