import { NavLink, useLocation } from "react-router-dom"
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets"
import { useState } from "react"


export default function SideBar ()
{
    const user = dummyUserData

    const location = useLocation()

    const [ image, setImage ] = useState<File | null>( null )

    const updateImage = async () =>
    {
        if ( !image ) return
        user.image = URL.createObjectURL( image )
        setImage( null )
    }


    return (
        <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">

            <div className="group relative">
                <label htmlFor="image">

                    <img src={ image ? URL.createObjectURL( image ) : user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJbhN88I9CuUGPLDK9IAkwPQl5jV4JPQpyn3nvGDFqo8JFF8U3TEikCOUq&s=10" } alt="" className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"/>
                    <input type="file" name="image" id="image" accept="image/*" onChange={ ( e ) => setImage( e.target.files?.[ 0 ] || null ) } hidden />

                    <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">

                        <img src={ assets.edit_icon } alt="" />

                    </div>
                </label>
                
            </div>
            {
                image && (
                    <button onClick={ updateImage } className="absolute transform -translate-x-1/20 mt-1 px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 right-0 cursor-pointer">
                        Save <img src={ assets.check_icon } alt="" width={ 13 } />
                    </button>
                )
            }
            
            <p className="mt-2 text-base max-md:hidden"> { user?.name }</p>
            <div className="w-full h-px bg-borderColor my-4">
                { ownerMenuLinks.map( ( link, index ) => (
                    <NavLink key={index} to={ link.path } className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path===location.pathname ? 'bg-primary/10 text-primary ':'text-gray-600'} `}>
                        <img src={link.path===location.pathname? link.coloredIcon : link.icon } alt="car icon" />
                        <span className="max-md:hidden">{ link.name }</span>
                        <div className={`${link.path===location.pathname && 'bg-primary'} w-1.5 rounded-l right-0 absolute`}>
                        
                        </div>
                    </NavLink>
                ) ) }

            </div>
        </div>
    )
}
