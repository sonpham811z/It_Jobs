import { Outlet, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePgae'
import NotFoundPage from '~/pages/404Page'
import Auth from './pages/Auth/Auth'
// import SignIn from '~/pages/Auth/loginForm'
function App() {
return (

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/login" element={<SignIn/>}/> */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="*" element={<NotFoundPage />}/>
        
      </Routes>
    
  )
}

export default App
