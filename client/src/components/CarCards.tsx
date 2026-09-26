import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

type Props = {
    carData: {
        _id: string,
        image: string,
        isAvailable: boolean,
        pricePerDay: number,
        brand: string,
        category: string,
        model: string,
        year: number,
        capacity: number,
        fuelType: string,
        transmision: string,
        location: string,
    }
}


export default function CarCards ( { carData }: Props )
{
    const currency = import.meta.env.VITE_CURRENCY as string;
    const navigate= useNavigate()

    return (
        <div
            onClick={ () => { navigate(`/car-details/${carData._id}`)} }
            className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer">

            {/* top section */ }
            <div className="relative h-48 overflow-hidden">
                <img src={ carData.image } alt="img" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                {
                    carData.isAvailable ? (
                        <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full font-semibold">
                            Available Now
                        </div>
                    ) : (
                        <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Not Available
                        </div>
                    )
                }


                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                    <span className="font-semibold">
                        { currency }{ carData.pricePerDay }
                    </span>
                    <span className="text-sm opacity-80">
                        / day
                    </span>
                </div>


            </div>

            {/* bottom section */ }
            <div className="p-4 sm:p-5">

                <div className="flex justify-between items-start mb-2">

                    <div>
                        <h3 className="text-lg font-semibold">{ carData.brand } { carData.model }</h3>
                        <p className="text-muted-foreground text-sm">{ carData.category } . { carData.year }</p>
                    </div>

                </div>
                <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">

                    <div className="flex items-center text-sm text-muted-foreground">
                        <img src={ assets.users_icon } alt="user icon" className="h-4 mr-2" />
                        <span>{ carData.capacity } Seats</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <img src={ assets.fuel_icon } alt="fuel icon" className="h-4 mr-2" />
                        <span>{ carData.fuelType }</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <img src={ assets.car_icon } alt="fuel icon" className="h-4 mr-2" />
                        <span>{ carData.transmision }</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">       
                        <img src={ assets.location_icon } alt="fuel icon" className="h-4 mr-2" />
                        <span>{ carData.location }</span>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}
