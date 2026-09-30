
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface LoginState
{
    isLogin: boolean;
}

const initialState: LoginState = {
    isLogin: localStorage.getItem( 'isLogin' ) === 'true',
};

const loginSlice = createSlice( {
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: ( state, action: PayloadAction<boolean> ) =>
        {
            state.isLogin = action.payload;
            localStorage.setItem( 'isLogin', action.payload.toString() );
        }
    }
} )

export const { setIsLogin } = loginSlice.actions
export default loginSlice.reducer
