import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface EmailState
{
    email: string;
}

const initialState: EmailState = {
    email: '',
};


const emailSlice = createSlice( {
    name: 'email',
    initialState,
    reducers: {
        setEmail: ( state, action: PayloadAction<EmailState> ) =>
        {
            state.email = action.payload.email
        }
    }
} )

export const { setEmail } = emailSlice.actions
export default emailSlice.reducer
