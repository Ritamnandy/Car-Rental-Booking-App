import { Link } from "react-router-dom";

export default function GoogleError ()
{
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 to-slate-50 p-6">
            <div className="w-full max-w-md rounded-2xl bg-white px-8 py-10 text-center shadow-xl">
                <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-red-600">
                    ✕
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-900">
                    Google login failed
                </h2>
                <p className="mb-6 leading-relaxed text-slate-500">
                    Something went wrong while signing you in. Please try again.
                </p>
                <Link
                    to="/"
                    className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}