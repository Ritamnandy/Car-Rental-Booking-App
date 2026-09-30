import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBar from "../../components/owner/SideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApiClass } from "../../api/auth/AuthApiClass";

type UserData = {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
}


export default function Layout ()
{

    const [ userData, setUserData ] = useState<UserData | null>( null )
    const handleUserDataUpdate = async () =>
    {
        try
        {
            const response = await authApiClass.getUserProfile()
            console.log( response?.data?.user )
            setUserData( response?.data?.user )
        } catch ( error )
        {
            console.log( "Register error:", error );
            toast.error( ( error as Error ).message );
        }
    }

    useEffect( () =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handleUserDataUpdate()
    }, [] );

    return (
        <div className="flex flex-col">
            <NavbarOwner userData={ userData?.name || "" } />
            <div className="flex ">
                <SideBar userData={ userData } />
                <Outlet />
            </div>
        </div>
    )
}
