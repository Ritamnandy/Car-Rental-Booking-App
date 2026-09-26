import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState } from "react";

type NavbarProps = {
    setShowLogin: ( show: boolean ) => void;
}


export default function Navbar ( { setShowLogin }: NavbarProps )
{
    const location = useLocation()

    const [ open, setOpen ] = useState( false )

    const navigate = useNavigate()


    return (
        <div className={ `flex items-center justify-between px-6 py-4 md:px-16 lg:px-24 xl:px-32 text-gray-600 border-b border-borderColor relative transition-all ${ location.pathname === '/' && 'bg-white' }  ` } >
            <Link to="/">
                <img src={ assets.logo } alt="logo" className="h-8" />
            </Link>

            <div className={ `max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50  ${ open ? 'max-sm:translate-x-0 bg-white' : 'max-sm:translate-x-full ' } ` } >
                {
                    menuLinks.map( ( link, index ) => (
                        <NavLink onClick={ () =>
                        {
                            if ( open )
                            {
                                setOpen(false)
                            }
                        }} className={ ( { isActive } ) =>
                            `block py-2 pr-4 pl-3 duration-200 ${ isActive ? "text-primary border-b-2 border-primary" : "text-gray-700 border-none" }  border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent  hover:text-primary-dull lg:p-0`
                        } key={ index } to={ link.path }>
                            { link.name }
                        </NavLink>
                    ) )
                }

                <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
                    <input type="text"
                        placeholder="Search products"
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" />
                    <img src={ assets.search_icon } alt="search" className="" />
                </div>
                <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
                    <button
                        onClick={ () => navigate( '/owner' ) }
                        className="cursor-pointer">Dashboard</button>
                    <button
                        onClick={ () =>
                        {
                            if ( open )
                            {
                                setOpen( false )
                            }
                            setShowLogin( true )
                        } }
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">Login</button>
                </div>

            </div>

            <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={ () => setOpen( !open ) }>
                <img src={ open ? assets.close_icon : assets.menu_icon } alt="menu" />
            </button>


        </div>
    )
}
