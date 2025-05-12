import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {API_ROOT} from '~/utils/constants'
import authorizedAxios from '~/utils/authorizedAxios'
import { toast } from 'react-toastify'

const initialState = {
    currentUser: null
}

export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',

    async() => {
        const response = await authorizedAxios.post('https://it-jobs-api-9kxz.onrender.com/server/users/login')

        return response.data
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    
    reducers: {
        clearDataUser: (state) => {
            state.currentUser = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
    }

})

export const { clearDataUser } = userSlice.actions

export const selectCurrentUser = (state) => state.user.currentUser
export const userReducer = userSlice.reducer