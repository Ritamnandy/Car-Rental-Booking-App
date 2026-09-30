import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authApiClass } from "../api/auth/AuthApiClass";

type Props = {
    email: string;
};

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 10 * 60;

const formatTime = ( total: number ) =>
{
    const m = String( Math.floor( total / 60 ) ).padStart( 2, "0" );
    const s = String( total % 60 ).padStart( 2, "0" );
    return `${ m }:${ s }`;
};

export default function VerifyOtp ( { email }: Props )
{
    const navigate = useNavigate();

    const [ otp, setOtp ] = useState<string[]>( Array( OTP_LENGTH ).fill( "" ) );
    const [ loading, setLoading ] = useState( false );
    const [ resending, setResending ] = useState( false );
    const [ secondsLeft, setSecondsLeft ] = useState( OTP_EXPIRY_SECONDS );
    const [ error, setError ] = useState( "" );

    const inputRefs = useRef<( HTMLInputElement | null )[]>( [] );

    // Focus first box on mount
    useEffect( () =>
    {
        inputRefs.current[ 0 ]?.focus();
    }, [] );

    // Countdown timer
    useEffect( () =>
    {
        if ( secondsLeft <= 0 ) return;

        const id = setInterval( () =>
        {
            setSecondsLeft( ( prev ) => prev - 1 );
        }, 1000 );

        return () => clearInterval( id );
    }, [ secondsLeft ] );

    const expired = secondsLeft <= 0;

    // Fill boxes starting at `start` with the given digits (handles typing, paste, autofill)
    const fillFrom = ( start: number, digits: string ) =>
    {
        const next = [ ...otp ];
        let i = start;

        for ( const d of digits )
        {
            if ( i >= OTP_LENGTH ) break;
            next[ i ] = d;
            i++;
        }

        setOtp( next );
        setError( "" );

        // Move focus to the next empty box (or the last box)
        inputRefs.current[ Math.min( i, OTP_LENGTH - 1 ) ]?.focus();
    };

    const handleChange = ( index: number, value: string ) =>
    {
        const digits = value.replace( /\D/g, "" );

        if ( !digits )
        {
            const next = [ ...otp ];
            next[ index ] = "";
            setOtp( next );
            return;
        }

        fillFrom( index, digits );
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) =>
    {
        if ( e.key === "Backspace" && !otp[ index ] && index > 0 )
        {
            inputRefs.current[ index - 1 ]?.focus();
        } else if ( e.key === "ArrowLeft" && index > 0 )
        {
            inputRefs.current[ index - 1 ]?.focus();
        } else if ( e.key === "ArrowRight" && index < OTP_LENGTH - 1 )
        {
            inputRefs.current[ index + 1 ]?.focus();
        }
    };

    const handlePaste = ( e: React.ClipboardEvent<HTMLInputElement> ) =>
    {
        e.preventDefault();
        const digits = e.clipboardData
            .getData( "text" )
            .replace( /\D/g, "" )
            .slice( 0, OTP_LENGTH );

        if ( digits ) fillFrom( 0, digits );
    };

    const handleSubmit = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();

        const code = otp.join( "" );

        if ( code.length !== OTP_LENGTH )
        {
            setError( "OTP must be exactly 6 digits" );
            return;
        }

        if ( expired )
        {
            setError( "OTP expired. Please resend a new one." );
            return;
        }

        setLoading( true );

        try
        {
            const response = await authApiClass.verifyUser( {
                email,
                otp: code,
            } );

            if ( response?.data?.success )
            {
                toast.success( "Email verified successfully" );
                navigate( "/" );
            }
        } catch ( err )
        {
            toast.error(
                err instanceof Error ? err.message : "OTP verification failed"
            );
        } finally
        {
            setLoading( false );
        }
    };

    const handleResend = async () =>
    {
        setResending( true );

        try
        {
            await authApiClass.resendOtpCode( { email } ); // adjust to your API method

            toast.success( "A new OTP has been sent to your email" );
            setOtp( Array( OTP_LENGTH ).fill( "" ) );
            setError( "" );
            setSecondsLeft( OTP_EXPIRY_SECONDS );
            inputRefs.current[ 0 ]?.focus();
        } catch ( err )
        {
            toast.error(
                err instanceof Error ? err.message : "Failed to resend OTP"
            );
        } finally
        {
            setResending( false );
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center text-gray-600 bg-white">
            <form
                onSubmit={ handleSubmit }
                className="relative flex flex-col items-center md:max-w-105.75 w-95 bg-white rounded-2xl shadow-lg p-6 sm:p-10"
            >
                { ( loading || resending ) && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 z-10">
                        <span className="loading loading-spinner text-primary loading-lg" />
                    </div>
                ) }

                <p className="text-2xl font-semibold text-gray-900">
                    Email Verify OTP
                </p>

                <p className="mt-2 text-sm text-gray-900/90 text-center mb-4">
                    Enter the 6-digit code sent to your email ID.
                </p>

                <div className="flex gap-2">
                    { otp.map( ( digit, index ) => (
                        <input
                            key={ index }
                            ref={ ( el ) => { inputRefs.current[ index ] = el; } }
                            type="text"
                            inputMode="numeric"
                            autoComplete={ index === 0 ? "one-time-code" : "off" }
                            value={ digit }
                            onChange={ ( e ) => handleChange( index, e.target.value ) }
                            onKeyDown={ ( e ) => handleKeyDown( index, e ) }
                            onPaste={ handlePaste }
                            onFocus={ ( e ) => e.target.select() }
                            disabled={ loading }
                            className="w-10 h-12 sm:w-11 sm:h-13 text-center text-xl font-semibold text-gray-900 border border-gray-300 rounded-md outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                        />
                    ) ) }
                </div>

                { error && (
                    <p className="text-red-500 text-sm mt-2">{ error }</p>
                ) }

                <p className="mt-4 text-sm">
                    { expired ? (
                        <span className="text-red-500">OTP expired</span>
                    ) : (
                        <>
                            Code expires in{ " " }
                            <span className="font-semibold text-gray-900">
                                { formatTime( secondsLeft ) }
                            </span>
                        </>
                    ) }
                </p>

                <button
                    type="submit"
                    disabled={ loading || expired }
                    className="mt-6 w-full max-w-80 h-11 rounded text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    { loading ? "Verifying..." : "Verify Email" }
                </button>

                <p className="mt-4 text-sm">
                    Didn't receive the code?{ " " }
                    <button
                        type="button"
                        onClick={ handleResend }
                        disabled={ !expired || resending }
                        className="text-indigo-500 font-medium disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Resend OTP
                    </button>
                </p>
            </form>
        </div>
    );
}