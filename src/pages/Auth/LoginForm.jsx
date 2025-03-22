import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/form/FieldErrorAlert'
import {EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { useSearchParams, useNavigate } from 'react-router-dom'


function LoginForm() {

  const { register, handleSubmit, formState: {errors}} = useForm()
  let [searchParams] = useSearchParams()
  const verifiedEmail = searchParams.get('verifiedEmail')
  const registeredEmail = searchParams.get('registeredEmail')
  const submitLogIn = (data) => {
    const {email, password} = data

    console.log(email, password);
    
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ 
          minWidth: 350, maxWidth: 350, marginTop: '5em',
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Màu nền trắng mờ (opacity 70%)
          backdropFilter: 'blur(8px)', // Làm mờ nền phía sau
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
         }}>
           <Box sx={{
            margin: '2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Login to It_Jobs</Typography>


          </Box>
          
          <Box sx={{ marginTop: '1em', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {verifiedEmail && <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              Your email&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{verifiedEmail}</Typography>
              &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
            </Alert>}
            {registeredEmail && <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
              An email has been sent to&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>{registeredEmail}</Typography>
              <br />Please check and verify your account before logging in!
            </Alert>}
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                {...register("email", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}                
              />
              <FieldErrorAlert errors={errors} fieldName="email"/>

            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register("password", {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName="password"/>

            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm

// import React from "react";
// import { Box, Button, Container, TextField, Typography, Divider } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import GitHubIcon from "@mui/icons-material/GitHub";

// const LoginPage = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f4f6f8",
//       }}
//     >
//       <Container
//         sx={{
//           maxWidth: 400,
//           padding: 4,
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           Trello
//         </Typography>
//         <Typography variant="body1" sx={{ marginBottom: 2 }}>
//           Log in to continue
//         </Typography>

//         <TextField fullWidth label="Enter your email" variant="outlined" sx={{ marginBottom: 2 }} />

//         <Button fullWidth variant="contained" sx={{ backgroundColor: "#0079bf", color: "white", marginBottom: 2 }}>
//           Continue
//         </Button>

//         <Divider sx={{ marginBottom: 2 }}>Or continue with:</Divider>

//         <Button
//           fullWidth
//           startIcon={<GoogleIcon />}
//           variant="outlined"
//           sx={{ marginBottom: 1, textTransform: "none" }}
//         >
//           Google
//         </Button>

//         <Button
//           fullWidth
//           startIcon={<GitHubIcon />}
//           variant="outlined"
//           sx={{ marginBottom: 2, textTransform: "none" }}
//         >
//           Github
//         </Button>

//         <Typography variant="body2">
//           Can't log in? <a href="#" style={{ textDecoration: "none", color: "#0079bf" }}>Create an account</a>
//         </Typography>

//         <Typography variant="caption" sx={{ display: "block", marginTop: 2, color: "gray" }}>
//           This entire project is a simple clone of Trello, made for educational purposes only.
//         </Typography>
//       </Container>
//     </Box>
//   );
// };

// export default LoginPage;

