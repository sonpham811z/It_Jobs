import axios from 'axios'
import { toast } from 'react-toastify'

import { interceptorLoadingElements } from './formatter'
import { logOutEmployerAPI } from '~/redux/employer/employerSlice'
import {employerRefreshTokenAPI} from '~/apis/index'


const authorizedAxios = axios.create({})
authorizedAxios.defaults.timeout = 1000*60*10 // sẽ cancle request nếu thời gian phẩn hồi quá 10p
authorizedAxios.defaults.withCredentials = true // đình kèm cookie khi gửi request

// kĩ thuật InjectStore
let store

export const injectStore = mainStore => {
    store = mainStore
}

authorizedAxios.interceptors.request.use((config) => {
    interceptorLoadingElements(true) // chặn spam click
    return config
}, (error) => {
    return Promise.reject(error)
})

let refreshTokenPromise = null

authorizedAxios.interceptors.response.use((response) => {
    interceptorLoadingElements(false)
    return response
}, async(error) => {
    //TH1: 401 => logout

    if(error.response.status === 401)
    {
        store.dispatch(logOutEmployerAPI())
        console.log(error);
    }
    //TH2: 410 call API refrershToken

    const originalRequest = error.config
    if(error.response.status === 410 && originalRequest)
    {
        if(!refreshTokenPromise)
        {
            refreshTokenPromise = employerRefreshTokenAPI().then(()=>{

            }).catch(err => {
                store.dispatch(logOutEmployerAPI(true))
                return Promise.reject(err)
            }).finally(() => {
                refreshTokenPromise = null
            })
        }

        return refreshTokenPromise.then(()=>{
            return authorizedAxios(originalRequest)
        })
    }

    // Tất cả các các status code trừ 410 (token) sẽ hiện thông báo ở đây
    interceptorLoadingElements(false)
    let errorMessage = error.message
    if(error.response?.data?.message)   
        errorMessage = error.response.data.message

    if(error.response?.status !== 410)
    {
        toast.error(errorMessage, {
            position: "bottom-right",
        })
    }

    return Promise.reject(error)
})

export default authorizedAxios