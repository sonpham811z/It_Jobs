import { useSearchParams, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { employerVerifyAccountAPI } from "~/apis/index"
import VerifyAgain from "./VerifyAgain"
import PageLoading  from "~/components/Loading/PageLoading"


export const AccountVerification = () => {
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const [verified, setverified] = useState(false)
  const [redirectTo404, setRedirectTo404] = useState(false);

  // Call API verify account nếu verify xong thì set viến virified thành true
  useEffect(() => {
    if(email && token) {
      employerVerifyAccountAPI({email, token}).then(() => {
        setverified(true)
      }).catch(error=>{
        
        if(error.response?.data?.message.includes('register again'))
          setRedirectTo404(true)
        if(error.response?.data?.message.includes('already active')) 
          setverified(true)
 
      })
      
    }
  }, [email, token])

  // Nếu không có 1 trong 2 token hoặc email thì đá ra trang 404
  if(!token || !email)
    return <Navigate to='/404' />

  if (redirectTo404) return <VerifyAgain/>;
  // Chưa verify xong thì quay đều
  if(!verified) {
    return <PageLoading caption='Your account is verifying' />
  }

  // Nếu oke hết thì về trang login với param verified đề employer login 
  return <Navigate to = {`/employer/login?verifiedEmail=${email}`} />


}