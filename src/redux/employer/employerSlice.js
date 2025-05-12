import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {API_ROOT} from '~/utils/constants'
import authorizedAxios from '~/utils/authorizedAxios'
import { toast } from 'react-toastify'

const initialState = {
    currentEmployer: null

}

export const loginEmployerAPI = createAsyncThunk(
    'employer/loginEmployerAPI',

    async(data) => {
        const response = await authorizedAxios.post(`${API_ROOT}/server/employers/login`, data)

        return response.data
    }
)

export const logOutEmployerAPI = createAsyncThunk(
    'employer/logOutAPI',
    async (toastOfTokenExpired = false) => {
      const response = await authorizedAxios.delete(`${API_ROOT}/server/employers/logout`)
      if(!toastOfTokenExpired)
        toast.success('Logout success')
      return response.data
    } 
)

export const updateEmployerAPI = createAsyncThunk(
    'employer/updateEmployerAPI',
    async (data) => {
        const response = await authorizedAxios.put(`${API_ROOT}/server/employers/updateEmployer`, data)
        return response.data
    }
)

export const employerSlice = createSlice({
    name: 'employer',
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(loginEmployerAPI.fulfilled, (state,action) => {
            state.currentEmployer = action.payload
        })

        builder.addCase(logOutEmployerAPI.fulfilled, (state,action) => {
            state.currentEmployer = null
        })

        builder.addCase(updateEmployerAPI.fulfilled, (state, action) => {
            state.currentEmployer = action.payload
        })
    }
})

export const selectCurrentEmployer = (state) => state.employer.currentEmployer
export const employerReducer = employerSlice.reducer