import { useNavigate } from "react-router-dom";



function NotFound() {



    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 h-screen w-screen">
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
            <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">Page Not Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <div className="flex items-center gap-4 mt-6">
                <span onClick={()=>navigate('/')} className="bg-primary-dull hover:bg-primary px-7 py-2.5 text-white rounded-md active:scale-95 transition-all cursor-pointer">
                    Return Home
                </span>
                <a href="#" className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md active:scale-95 transition-all">
                    Contact support
                </a>
            </div>
        </div>
    );
}

export default NotFound