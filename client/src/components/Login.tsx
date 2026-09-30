import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authApiClass } from "../api/auth/AuthApiClass";
import type { loginData } from "../types/api.types";
import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";


type Props = {
    setShowLogin: ( show: boolean ) => void
    setShowSignup: ( show: boolean ) => void
}

export default function Login ( { setShowLogin, setShowSignup }: Props )
{

    const [ loading, setLoading ] = useState( false );
    const [ seenPassword, setSeenPassword ] = useState( false );
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginData>( {
        mode: "onBlur",
    } );

    const onSubmit = async ( data: loginData ) =>
    {
        setLoading( true );

        console.log( "Form data:", data );

        try
        {
            const response = await authApiClass.loginUser( {
                email: data.email,
                password: data.password,
            } );

            console.log( "Register response:", response );

            if ( response?.data?.success )
            {
                setShowSignup( false );
                navigate( "/verify-otp" );
            }
        } catch ( error )
        {
            console.log( "Register error:", error );
            toast.error( ( error as Error ).message );
        } finally
        {
            setLoading( false );
        }
    };


    return (
        <div
            onClick={ () => setShowLogin( false ) }
            className="fixed flex justify-center items-center inset-0 text-gray-600 bg-black/50 z-50"
        >
            <form
                onSubmit={ handleSubmit( onSubmit ) }
                onClick={ ( e ) => e.stopPropagation() }
                className="relative bg-white text-gray-500 w-full max-w-85 mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
            >
                {/* Loading */ }
                { loading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/60 z-10">
                        <span className="loading loading-spinner text-primary loading-lg" />
                    </div>
                ) }

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    <span className="text-primary">Log </span>
                    <span>In</span>
                </h2>

                {/* Email */ }
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className={ `input ${ errors.email
                            ? "input-error"
                            : "input"
                            }` }
                        { ...register( "email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address",
                            },
                        } ) }
                    />

                    { errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            { errors.email.message }
                        </p>
                    ) }
                </div>

                {/* Password */ }
                <div className="mb-3">
                    <div className="relative">
                        <input
                            type={ seenPassword ? "text" : "password" }
                            placeholder="Enter Password"
                            className={ `input w-full ${ errors.password ? "input-error" : "input"
                                }` }
                            { ...register( "password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&*!]).{8,}$/,
                                    message:
                                        "Password must contain uppercase, lowercase and special character",
                                },
                            } ) }
                        />

                        <button
                            type="button"
                            onClick={ () => setSeenPassword( !seenPassword ) }
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                            <img
                                className="w-10 h-10"
                                src={
                                    seenPassword
                                        ? assets.eye_icon
                                        : assets.eye_close_icon
                                }
                                alt={ seenPassword ? "Hide password" : "Show password" }
                            />
                        </button>
                    </div>

                    { errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            { errors.password.message }
                        </p>
                    ) }
                </div>
                <span onClick={ () =>
                {
                    setShowLogin( false )
                    navigate( "/forget-password" )
                } } className="text-blue-600 underline cursor-pointer text-right flex flex-row-reverse mb-2" >Forgot Password</span>
                {/* Submit */ }
                <button
                    type="submit"
                    disabled={ loading }
                    className={ `w-full mb-3 btn btn-primary ${ loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                        }` }
                >
                    { loading ? "Logging in..." : "Login" }
                </button>

                <p className="text-center mt-4">
                    Create an account?{ " " }
                    <span
                        onClick={ () =>
                        {
                            setShowLogin( false );
                            setShowSignup( true );
                        } }
                        className="text-blue-500 underline cursor-pointer"
                    >
                        click here
                    </span>
                </p>
                <div className=" text-center">or</div>
                <button type="button" className="w-full flex items-center text-sm gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded text-gray-800 cursor-pointer">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                    Log in with Google
                </button>
            </form>
        </div>
    );

}


/*<div className="text-right py-4">
                        <span onClick={ () =>
                        {
                            setShowLogin( false )
                            navigate( "/forget-password" )
                        } } className="text-blue-600 underline cursor-pointer" >Forgot Password</span>
                    </div>
                    <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded text-white cursor-pointer">Log in</button>
                </form>
                <p className="text-center mt-4">Don’t have an account? <span onClick={ () =>
                {
                    setShowLogin( false )
                    setShowSignup( true )
                } } className="text-blue-500 underline cursor-pointer">Signup</span></p>

                <button type="button" className="w-full flex items-center text-sm gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded text-gray-800 cursor-pointer">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                    Log in with Google
                </button> */
