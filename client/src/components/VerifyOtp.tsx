import { useNavigate } from "react-router-dom"



export default function VerifyOtp ( )
{

    const navigate = useNavigate()

    const handleSubmit = ( e: React.MouseEvent<HTMLButtonElement> ) =>
    {
        e.preventDefault()
        navigate("/")
        
    }
    return (
        <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0  text-gray-600 bg-white">

            <div className="flex flex-col items-center md:max-w-105.75 w-95 bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                <p className="mt-2 text-sm text-gray-900/90 text-center">Enter the 6-digit code sent to your email ID.</p>

                <div className="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength={ 1 } className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                </div>

                <button onClick={ handleSubmit } type="button" className="mt-8 w-full max-w-80 h-11 rounded text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer">
                    Verify Email
                </button>
            </div>


        </div>
    )
}
