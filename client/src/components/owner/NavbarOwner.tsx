import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"

type Props = {
    userData: string
}


export default function NavbarOwner ( { userData }: Props )
{



    return (
        <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all duration-300">
            <Link to='/'>
                <img src={ assets.logo } alt="logo" className="h-7" />
            </Link>
            <p>Welcome, { userData || "Owner" }</p>
        </div>
    )
}
