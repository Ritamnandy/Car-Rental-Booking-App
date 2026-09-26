import { useNavigate } from "react-router-dom"

type Props = {
    
    setShowSignup: ( show: boolean ) => void
}

export default function ForgetPassword ( { setShowSignup }: Props )
{
    const navigate=useNavigate()
    const handleSubmit = ( e: React.MouseEvent ) =>
    {
        e.preventDefault()
        
    }

    return (
        <div className="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0  text-gray-600 bg-white">

            <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forget Password?</h2>
                <label htmlFor="email">Email</label>
                <input id="email" className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" />
                <button onClick={ handleSubmit } type="button" className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white">Send Email</button>
                <p className="text-center mt-4">Don’t have an account? <span onClick={ () =>
                {
                    navigate( "/" )
                    setShowSignup( true )
                } } className="text-blue-500 underline cursor-pointer">Signup Now</span></p>
            </div>

        </div>
    )
}
