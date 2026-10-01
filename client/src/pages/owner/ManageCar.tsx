import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, type Car } from "../../assets/assets";
import toast from "react-hot-toast";
import { carApiClass } from "../../api/car/ApiClass";

type Props = {
    ownerId: string
}

export default function ManageCar ( { ownerId }: Props )
{

    const [ cars, setCars ] = useState<Car[]>( [] )

    const currency = import.meta.env.VITE_CURRENCY as string


    const fetchData = async () =>
    {

        try
        {
            const response = await carApiClass.getCarByOwnerId( ownerId );

            console.log( "Owner car response:", response?.data?.success );

            if ( response?.data?.success )
            {
                console.log( response.data );
                setCars( response?.data?.data || [] )

            }
        } catch ( error )
        {
            console.log( "Owner car error:", error );
            toast.error( ( error as Error ).message );
        }
    }

    useEffect( () =>
    {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData()
    },  )


    return (
        <div className="px-4 py-10 md:px-10 w-full ">
            <Title title="Manage Cars" subtitle="View all listed cars, update their details, or remove them from the booking platform" />

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">

                <table className="w-full border-collapse text-left text-sm text-gray-600">

                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Car</th>
                            <th className="p-3 font-medium max-md:hidden">Category</th>
                            <th className="p-3 font-medium">Price</th>
                            <th className="p-3 font-medium max-md:hidden">Status</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            cars.map( ( car ) => (
                                <tr key={ car.id } className="border-t border-borderColor">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={ car.image } alt={ car.brand } className="w-16 h-16 object-cover rounded-md aspect-square" />
                                        <div className="max-md:hidden">
                                            <p className="font-medium">{ car.brand }  { car.model }</p>
                                            <p className="text-xs text-gray-500">{ car.seating_capacity }  .  { car.transmission }</p>
                                        </div>
                                    </td>

                                    <td className="p-3 ">
                                        { car.category }
                                    </td>
                                    <td className="p-3 max-md:hidden">{ currency }
                                        { car.pricePerDay } /day
                                    </td>

                                    <td className="p-3 max-md:hidden">
                                        <span className={ `px-3 py-1 rounded-full text-xs ${ car.isAvaliable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500' }` }>
                                            { car.isAvaliable ? 'Available' : 'Unavailable' }
                                        </span>
                                    </td>

                                    <td className="flex items-center p-3">
                                        <img src={ car.isAvaliable ? assets.eye_close_icon : assets.eye_icon } alt="" className="cursor-pointer" />

                                        <img src={ assets.delete_icon } alt="" className="cursor-pointer" />
                                    </td>
                                </tr>
                            ) )
                        }
                    </tbody>

                </table>

            </div>



        </div>
    )
}
