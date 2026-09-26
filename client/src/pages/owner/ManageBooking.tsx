import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { dummyMyBookingsData } from "../../assets/assets";
import type { Booking } from "../../types/booking.types";



export default function ManageBooking ()
{
    const [ booking, setBooking ] = useState<Booking[]>( [] )

    const currency = import.meta.env.VITE_CURRENCY as string

    const fetchData = async () =>
    {
        setBooking( dummyMyBookingsData )
    }

    useEffect( () =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData()
    }, [] )

    return (
        <div className="px-4 py-10 md:px-10 w-full ">
            <Title title="Manage Bookings" subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses" />

            <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">

                <table className="w-full border-collapse text-left text-sm text-gray-600">

                    <thead className="text-gray-500">
                        <tr>
                            <th className="p-3 font-medium">Car</th>
                            <th className="p-3 font-medium max-md:hidden">Date Range</th>
                            <th className="p-3 font-medium">Total Price</th>
                            <th className="p-3 font-medium max-md:hidden">Peyment</th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            booking.map( ( bookingData ) => (
                                <tr key={ bookingData._id } className="border-t border-borderColor  text-gray-500">

                                    <td className="p-3 flex items-center gap-3">

                                        <img src={ bookingData.car.image } alt={ bookingData.car.brand } className="w-16 h-16 object-cover rounded-md aspect-square" />
                                        <p className="font-medium max-md:hidden">{ bookingData.car.brand }  { bookingData.car.model }</p>
                                    </td>


                                    <td className="p-3 max-md:hidden">
                                        {
                                            bookingData.pickupDate.split( 'T' )[ 0 ].replaceAll( '-', '/' )
                                        }  to  {
                                            bookingData.returnDate.split( 'T' )[ 0 ].replaceAll( '-', '/' )
                                        }
                                    </td>

                                    <td className="p-3">{ currency }
                                        { bookingData.price }
                                    </td>
                                    <td className="p-3 max-md:hidden">
                                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Offline</span>
                                    </td>

                                    <td className="p-3">
                                        {
                                            bookingData.status === 'pending' ? (
                                                <select value={bookingData.status} className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none" >
                                                    <option value="pending">Pending</option>
                                                    <option value="canceled">Canceled</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            ) : (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bookingData.status==="confirmed" ? "bg-green-100 text-green-800" : bookingData.status==="canceled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{bookingData.status}</span>
                                            )
                                        }
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
