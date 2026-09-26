import { useState } from "react";
import { assets, dummyCarData } from "../assets/assets";
import Title from "../components/Title";
import CarCards from "../components/CarCards";




export default function Cars ()
{

    const [ searchQuery, setSearchQuery ] = useState( "" );

    return (
        <div>
            {/* title & search bars */ }
            <div className="flex flex-col items-center py-29 bg-light max-md:px-4 ">
                <Title title="Available Cars" subtitle="Browse our selection of premium vehicles available for your next adventure" align="center" />

                <div className="flex items-center bg-white px-4 mt-6 mx-w-140 w-auto sm:w-160 h-12 rounded-full shadow-md">
                    <img src={ assets.search_icon } alt="Search" className="w-4.5 h-4.5 mr-2" />
                    <input type="text"
                        onChange={ ( e ) => setSearchQuery( e.target.value ) }
                        value={ searchQuery }
                        placeholder="Search by make, model, or features" className="w-full outline-none text-gray-500 " />
                    <img src={ assets.filter_icon } alt=" filter_icon" className="w-4.5 h-4.5 ml-2" />
                </div>
            </div>
            {/* display all cars */ }
            <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
                <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">Showing { dummyCarData.length } Cars</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
                    {
                        dummyCarData.map( ( car, index ) => (
                            <div key={ index }>
                                <CarCards carData={ {_id: car._id, image: car.image, isAvailable: car.isAvaliable, pricePerDay: car.pricePerDay, brand: car.brand, category: car.category, model: car.model, year: car.year, capacity: car.seating_capacity, fuelType: car.fuel_type, transmision: car.transmission, location: car.location} } />
                            </div>
                        ) )
                    }
                </div>
            </div>
        </div>
    )
}
