import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import emailReducer from '../features/login/emailSlice'

export const store = configureStore( {
    reducer: {
        login: loginReducer,
        email:emailReducer
    }
} )


// Infer the `RootState`, `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store