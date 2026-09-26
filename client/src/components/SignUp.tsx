import { useNavigate } from "react-router-dom"

type Props = {
    setShowSignup: ( show: boolean ) => void
    setShowLogin: ( show: boolean ) => void
}

export default function SignUp ( { setShowSignup, setShowLogin }: Props )
{


    const navigate = useNavigate()

    const handleSubmit = ( e: React.SubmitEvent ) =>
    {
        e.preventDefault()
        setShowSignup( false )
        navigate("/verify-otp")
        

    }




    return (
        <div onClick={ () =>
        {
            setShowSignup( false )
        } } className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0  text-gray-600 bg-black/50 z-50">


            <form onSubmit={ handleSubmit } onClick={ ( e ) => e.stopPropagation() } className="bg-white text-gray-500 w-full max-w-85 mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                <input id="name" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Enter Name" required />
                <input id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Enter Email" required />
                <input id="password" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Enter Password" required />

                <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium cursor-pointer">Create Account</button>

                <p className="text-center mt-4">Already have an account? <span onClick={ () =>
                {
                    setShowSignup( false )
                    setShowLogin( true )
                } } className="text-blue-500 underline cursor-pointer">Log In</span></p>
            </form>







        </div>
    )
}
