
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type IsLogin = boolean



const initialState: IsLogin = false

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: (state, action:PayloadAction<IsLogin>) => {
            state = action.payload
        }
    }
})

export const { setIsLogin } = loginSlice.actions
export default loginSlice.reducer
