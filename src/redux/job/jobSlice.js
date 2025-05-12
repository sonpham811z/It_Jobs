import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {API_ROOT} from '~/utils/constants'
import authorizedAxios from '~/utils/authorizedAxios'
import { toast } from 'react-toastify'

const initialState = {
    currentJobs: []

}

export const getJobsByEmployerIdAPI = createAsyncThunk(
    'jobs/getJobsByEmployerIdAPI',
    async(employerId) => {
        const response = await authorizedAxios.get(`${API_ROOT}/server/jobs/by-employer/${employerId}`)
       return response.data
    }
)

export const jobSlice = createSlice({
    name: 'job',
    initialState,

    reducers: {
        addJobs: (state, action) => {
            state.currentJobs.unshift(action.payload)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getJobsByEmployerIdAPI.fulfilled, (state, action) => {
            state.currentJobs = action.payload
        })
    }

})

export const { addJobs } = jobSlice.actions
export const selectCurrentJobs = (state) => state.job.currentJobs
export const  jobReducer = jobSlice.reducer