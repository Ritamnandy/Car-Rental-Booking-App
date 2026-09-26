import { useNavigate } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import CarCards from "./CarCards";
import Title from "./Title";



export default function FeaturesSection ()
{
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
            <div>
                <Title title="Featured Vehicles" subtitle="Explore our selection of premium vehicles available for your next adventure." align="center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {
                    dummyCarData.slice( 0, 6 ).map( ( car ) => (
                        <div key={ car._id }>
                            <CarCards carData={ {
                                _id: car._id,
                                brand: car.brand, category: car.category, model: car.model, year: car.year, capacity: car.seating_capacity, fuelType: car.fuel_type, transmision: car.transmission, location: car.location, image: car.image, isAvailable: car.isAvaliable, pricePerDay: car.pricePerDay
                            } } />
                        </div>
                    ) )
                }
            </div>
            <button
                onClick={ () =>
                {
                    navigate( '/cars' )
                    scrollTo( 0, 0 )
                } }
                className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer">
                Explore all cars
                <img src={ assets.arrow_icon } alt="arrow_icon" />
            </button>
        </div>
    )
}
