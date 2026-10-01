import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../hooks/useReduxConfig";

export default function GoogleSuccess ()
{
    const navigate = useNavigate();

    const { setLoginValue } = useLoginState()
    useEffect( () =>
    {
        setLoginValue( true )
        const timer = setTimeout( () => navigate( "/", { replace: true } ), 1500 );
        return () => clearTimeout( timer );
    }, [ navigate, setLoginValue ] );

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 to-slate-50 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-xl">
                <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-600">
                    ✓
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                    Login successful
                </h2>
                <p className="mb-6 leading-relaxed text-slate-500">
                    Redirecting you to the dashboard...
                </p>
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />
            </div>
        </div>
    );
}