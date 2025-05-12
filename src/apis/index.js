import authorizedAxios from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
import { TokenSharp } from '@mui/icons-material'
import axios from 'axios'

//API cho employer
export const employerRegisterAPI = async(data) => {
    const response = await authorizedAxios.post(`${API_ROOT}/server/employers/register`, data)
    toast.success('Account created successfully, please check your email to verify your account')
    return response.data
}

export const employerVerifyAccountAPI = async(data) => {
    const response = await authorizedAxios.put(`${API_ROOT}/server/employers/verify_account`, data)
    toast.success('Account verified successfully, Login to use IT_Jobs for Employers')
    return response.data
}

export const employerRefreshTokenAPI = async() => {
    return await authorizedAxios.put(`${API_ROOT}/server/employers/refresh_token/`)
}

export const getEmployerByIdAPI = async(employerId) => {
    return await authorizedAxios.get(`${API_ROOT}/server/employers/${employerId}`)   
}


//API for jobs
export const createNewJobsAPI = async(data) => {
    const response = await authorizedAxios.post(`${API_ROOT}/server/jobs/createNewJob`, data)
    toast.success('Create new job success')
    return response.data
}

export const getJobByIdAPI = async(id) => {
    const response = await authorizedAxios.get(`${API_ROOT}/server/jobs/${id}`)
    return response.data
}

export const getNewJobsAPI = async() => {
    const response = await authorizedAxios.get(`${API_ROOT}/server/jobs/getNewJobs`, {
        withCredentials: false,
    })
    return response.data
}


// API for apply
export const applyNewJob = async(reqData) => {
    const response = await authorizedAxios.post(`${API_ROOT}/server/apply/applyNewJob`, reqData, {
        headers: { 'Content-Type' : 'multipart/form-data' }
    })

    return response.data
}
