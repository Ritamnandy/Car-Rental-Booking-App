
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'
import { setIsLogin } from '../features/login/loginSlice'
import { setEmail } from '../features/login/emailSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

const useLoginState = () =>
{
    const dispatch = useAppDispatch()

    const isLogin = useAppSelector( ( state ) => state.login.isLogin )

    const setLoginValue = ( val: boolean ) => dispatch( setIsLogin( val ) )    
    return { isLogin, setLoginValue }
}

const useEmailState = () =>
{
    const dispatch = useAppDispatch()

    const email = useAppSelector( ( state ) => state.email.email )

    const setEmailValue = ( val: string ) => dispatch( setEmail( { email: val } ) )
    return { email, setEmailValue }
}

export { useLoginState, useEmailState }
