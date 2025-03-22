import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import {EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/form/FieldErrorAlert' 
import { useNavigate } from 'react-router-dom'


function RegisterForm() {
  const { register, handleSubmit, formState: {errors}} = useForm()
  const navigate = useNavigate()
  const submitRegister = (data) => {
    const {email, password} = data
    console.log(email, password);
    
  }
  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 350, maxWidth: 350, marginTop: '4em',
          backgroundColor: 'rgba(255, 255, 255, 0.6)', // Màu nền trắng mờ (opacity 70%)
          backdropFilter: 'blur(8px)', // Làm mờ nền phía sau
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <Box sx={{
            margin: '2em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
           <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>Register</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
          <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Full Name"
                type="text"
                variant="outlined"
                error={!!errors.fullname}
                {...register('fullname', {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
              />
              <FieldErrorAlert errors={errors} fieldName="fullname"/>
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Email..."
                type="text"
                variant="outlined"
                error={!!errors.email}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName="email" />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Password..."
                type="password"
                variant="outlined"
                error={!!errors.password}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName="password" />
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
              Register
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Already have an account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Log in!</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm
