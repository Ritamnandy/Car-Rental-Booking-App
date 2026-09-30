import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { assets, dummyCarData, type Car } from "../assets/assets"
import Lodding from "../components/Lodding"



export default function CarDetails ()
{

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY as string
    const [ carData, setCarData ] = useState<null | Car>( null )

    useEffect( () =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarData( dummyCarData.find( ( car ) => car._id === id ) || null )
    }, [ id ] )


    const showData = carData === null ? [] : [
        {
            icon: assets.users_icon,
            text: `${ carData.seating_capacity } Seats`
        },
        {
            icon: assets.fuel_icon,
            text: `${ carData.fuel_type }`
        },
        {
            icon: assets.car_icon,
            text: `${ carData.transmission } `
        },
        {
            icon: assets.location_icon,
            text: `${ carData.location }`
        }

    ]
    const features = [
        'Leather Seats', '360 Camera, GPS', 'Wireless Charging, Bluetooth', 'Panoramic Sunroof'
    ]

    const handleSubmit = async ( e: React.SubmitEvent<HTMLFormElement> ) =>
    {
        e.preventDefault()
        console.log( 'Form submitted', e.currentTarget )
    }




    return carData ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-16">

            <button onClick={ () => navigate( -1 ) } className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer">
                <img src={ assets.arrow_icon } alt="" className="rotate-180 opacity-65" />
                Back to all cars
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* left: car image & details */ }
                <div className="lg:col-span-2">
                    <img src={ carData.image } alt="" className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md" />
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{ carData.brand } { carData.model }</h1>
                            <p className="text-gray-500 text-lg">{ carData.category } . { carData.year }</p>
                        </div>
                        <hr className="border-borderColor my-6" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {
                                showData.map( ( data ) => (
                                    <div key={ data.text }>
                                        <img src={ data.icon } alt={ data.icon } className="h-5 mb-2" />
                                        { data.text }
                                    </div>
                                ) )
                            }
                        </div>

                        {/* description */ }
                        <div>
                            <h1 className="text-xl font-medium mb-3">Description</h1>
                            <p className="text-gray-500">{ carData.description }</p>
                        </div>

                        {/* features */ }
                        <div>
                            <h1 className="text-xl font-medium mb-3">Features</h1>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {
                                    features.map( ( feature ) => (
                                        <li key={ feature }>
                                            <img src={ assets.check_icon } alt="" className="h-5 mr-2 inline" />
                                            { feature }
                                        </li>
                                    ) )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* right: booking form */ }
                <form onSubmit={ handleSubmit } className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">

                    <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">{ currency } { carData.pricePerDay } <span className="text-gray-400 text-base font-normal"> per day</span>  </p>

                    <hr className="border-borderColor my-6 " />

                    <div className="flex flex-col gap-2">
                        <label htmlFor="pickup-date">Pickup Date</label>
                        <input type="date"
                            min={ new Date().toISOString().split( 'T' )[ 0 ] }
                            id="pickup-date" className=" py-2 px-3 border border-borderColor rounded-lg" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="return-date">Return Date</label>
                        <input type="date"
                            id="return-date" className=" py-2 px-3 border border-borderColor rounded-lg" required />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dull text-white py-3 transition-all font-medium cursor-pointer rounded-xl">Book Now</button>
                    <p className="text-sm text-gray-400 text-center">No credit card required to reserve</p>
                </form>
            </div>

        </div>
    ) : <Lodding />
}


