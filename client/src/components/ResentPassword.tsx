import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authApiClass } from "../api/auth/AuthApiClass";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

type Props = {
    setShowLogin: ( show: boolean ) => void;
};

type ResetPassword = {
    password: string;
    confirmPassword: string
};


export default function ResetPassword ( { setShowLogin }: Props )
{
    const [ loading, setLoading ] = useState( false );
    const [ seenPassword, setSeenPassword ] = useState( false );
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const token = searchParams.get( "token" );

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ResetPassword>( {
        mode: "onBlur",
    } );

    const onSubmit = async ( data: ResetPassword ) =>
    {
        if ( !token )
        {
            toast.error( "Invalid or missing reset token" );
            return;
        }
        setLoading( true );

        try
        {
            const response = await authApiClass.resetPassword( {
                token,
                password: data.password,
            } );

            console.log( "Reset password response:", response );

            if ( response?.data?.success )
            {
                navigate( "/" );
                setShowLogin( true );
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
            className="fixed flex justify-center items-center inset-0 text-gray-600 bg-black/50 z-50"
        >
            <form
                onSubmit={ handleSubmit( onSubmit ) }
                className="relative bg-white text-gray-500 w-full max-w-85 mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
            >
                {/* Loading */ }
                { loading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/60 z-10">
                        <span className="loading loading-spinner text-primary loading-lg" />
                    </div>
                ) }

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Resent Password
                </h2>



                {/* Password */ }
                {/* Password */ }
                <div className="mb-7">
                    <div className="relative">
                        <input
                            type={ seenPassword ? "text" : "password" }
                            placeholder="Enter Password"
                            className={ `input w-full ${ errors.password ? "input-error" : ""
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
                            className="absolute right-2 top-1/2 -translate-y-1/2"
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

                {/* Confirm Password */ }
                <div className="mb-7">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className={ `input w-full ${ errors.confirmPassword ? "input-error" : ""
                            }` }
                        { ...register( "confirmPassword", {
                            required: "Please confirm your password",

                            validate: ( value ) =>
                                value === getValues( "password" ) ||
                                "Passwords do not match",
                        } ) }
                    />

                    { errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">
                            { errors.confirmPassword.message }
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
                    { loading ? "Changing..." : "Change Password" }
                </button>

                <p className="text-center mt-4">
                    Already have an account?{ " " }
                    <span
                        onClick={ () =>
                        {
                            navigate( '/' )
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