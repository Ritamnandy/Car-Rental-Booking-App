import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBar from "../../components/owner/SideBar";

type UserData = {
     id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
} 


export default function Layout ({ userData }: { userData: UserData | null })
{

    

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
