import { useNavigate } from "react-router-dom";


type Props = {
    setShowLogin: ( show: boolean ) => void
    setShowSignup: ( show: boolean ) => void
}

export default function Login ( { setShowLogin, setShowSignup }: Props )
{

    const navigate = useNavigate()

    return (
        <div onClick={ () => setShowLogin( false ) } className="fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 text-gray-600 bg-black/50 z-50 ">

            <div onClick={ ( e ) => e.stopPropagation() } className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10 z-50">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
                <form>
                    <input id="email" className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" required />
                    <input id="password" className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded py-2.5 px-4" type="password" placeholder="Enter your password" required />
                    <div className="text-right py-4">
                        <span onClick={ () =>
                        {
                            setShowLogin( false )
                            navigate("/forget-password")
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
                </button>
            </div>
        </div>
    );

}
