import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authApiClass } from "../api/auth/AuthApiClass";
import toast from "react-hot-toast";
import type { registerData } from "../types/api.types";
import { assets } from "../assets/assets";
import { useEmailState } from "../hooks/useReduxConfig";

type Props = {
    setShowSignup: ( show: boolean ) => void;
    setShowLogin: ( show: boolean ) => void;
};



export default function SignUp ( {
    setShowSignup,
    setShowLogin,
}: Props )
{
    const [ loading, setLoading ] = useState( false );
    const [ seenPassword, setSeenPassword ] = useState( false );
    const navigate = useNavigate();
    const { setEmailValue } = useEmailState()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<registerData>( {
        mode: "onBlur",
    } );

    const onSubmit = async ( data: registerData ) =>
    {
        setLoading( true );

        console.log( "Form data:", data );


        try
        {
            const response = await authApiClass.registerUser( {
                name: data.name,
                email: data.email,
                password: data.password,
            } );

            console.log( "Register response:", response );

            if ( response?.data?.success )
            {
                setShowSignup( false );
                setEmailValue( data.email );
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
            onClick={ () => setShowSignup( false ) }
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
                    Sign <span className="text-primary">Up</span>
                </h2>

                {/* Name */ }
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className={ `input ${ errors.name
                            ? "input-error"
                            : "input"
                            }` }
                        { ...register( "name", {
                            required: "Name is required",
                            minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                            },
                        } ) }
                    />

                    { errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            { errors.name.message }
                        </p>
                    ) }
                </div>

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
                <div className="mb-7">
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

                {/* Submit */ }
                <button
                    type="submit"
                    disabled={ loading }
                    className={ `w-full mb-3 btn btn-primary ${ loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                        }` }
                >
                    { loading ? "Creating..." : "Create Account" }
                </button>

                <p className="text-center mt-4">
                    Already have an account?{ " " }
                    <span
                        onClick={ () =>
                        {
                            setShowSignup( false );
                            setShowLogin( true );
                        } }
                        className="text-blue-500 underline cursor-pointer"
                    >
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
}