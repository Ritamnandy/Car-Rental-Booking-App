import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type EmailType = string


const initialState: EmailType = ''


const emailSlice = createSlice( {
    name: 'email',
    initialState,
    reducers: {
        setEmail: ( state, action: PayloadAction<EmailType> ) =>
        {
            state = action.payload
        }
    }
} )

export const { setEmail } = emailSlice.actions
export default emailSlice.reducer
