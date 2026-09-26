import { useEffect, useState } from "react"
import { assets, dummyDashboardData } from "../../assets/assets"
import type { DashboardData } from "../../types/booking.types"
import Title from "../../components/owner/Title"



export default function Dashboards ()
{

    const [ data, setData ] = useState<DashboardData | null>( null )

    const currency = import.meta.env.VITE_CURRENCY as string

    const dasboardsCards = [
        { title: 'Total Cars', value: data?.totalCars || 0, icon: assets.carIconColored },
        { title: 'Total Bookings', value: data?.totalBookings || 0, icon: assets.listIconColored },
        { title: 'Pending', value: data?.pendingBookings || 0, icon: assets.cautionIconColored },
        { title: 'Confirmed', value: data?.completedBookings || 0, icon: assets.listIconColored }
    ]


    useEffect( () =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData( dummyDashboardData as DashboardData )
    }, [] )


    return (
        <div className="px-4 pt-10 md:px-10 flex-1">

            <Title subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" title="Admin Dashboard" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
                {
                    dasboardsCards.map( ( card, index ) => (
                        <div key={ index } className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor">
                            <div>
                                <h1 className="text-xs text-gray-500">{ card.title }</h1>
                                <p className="text-lg font-semibold">{ card.value }</p>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                <img src={ card.icon } alt="" className="w-4 h-4" />
                            </div>
                        </div>
                    ) )
                }
            </div>

            <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
                {/* recent booking */ }
                <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
                    <h1 className="text-lg font-medium">Recent Bookings</h1>
                    <p className="text-gray-500">Latest customer bookings</p>
                    {
                        data?.recentBookings?.map( ( booking, index ) => (
                            <div key={ index } className="flex mt-4 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                        <img src={ assets.listIconColored } alt="" className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{ booking.car.brand } { booking.car.model }</p>
                                        <p className="text-xs text-gray-500">{ booking.createdAt.split( 'T' )[ 0 ] }</p>
                                    </div>
                                </div>

                                <div className="flex items-center font-medium">
                                    <p className="text=sm text-gray-500">{ currency } { booking.price }</p>
                                    <p className={ `ml-10 px-3 py-1 text-xs rounded-full ${ booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' : booking.status === "pending" ? 'bg-yellow-400/15 text-yellow-600' : 'bg-red-400/15 text-red-600' }` }>{ booking.status }</p>
                                </div>

                            </div>
                        ) )
                    }
                </div>

                {/* monthly revenue */ }
                <div className="p-4 md:p-6 pb-6 border border-borderColor rounded-md w-full md:max-w-xs">
                    <h1 className="text-lg font-medium">Monthly Revenue</h1>
                    <p className="text-gray-500">Revenue for current month</p>
                    <p className="text-primary text-3xl mt-6 font-semibold">{ currency } { data?.monthlyRevenue || 0 }</p>
                </div>
            </div>

        </div>
    )
}
