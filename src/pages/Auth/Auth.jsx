import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function Auth() {
  const location = useLocation() // get current location
  // console.log(location)
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url("src/assets/bgAuth.png")',
      backgroundSize: '100%', 
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Giữ nguyên vị trí khi cuộn
      boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)',
    }}
  >  
      {isLogin && <LoginForm/>}
      {isRegister && <RegisterForm />}
    </Box>
  )
}

export default Auth