import { useState } from "react";
import { assets, cityList } from "../assets/assets";


export default function Hero ()
{

    const [ pickupLocation, setPickupLocation ] = useState( "" )

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-light text-center">

            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Luxury Cars on Rent</h1>
            <p className="text-lg md:text-xl mb-8">Book your dream car today</p>

            <form action="" className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">

                <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">
                    <div className="flex flex-col items-start gap-2">
                        <select defaultValue="Pickup Location" className="select select-ghost select-lg"
                            onChange={ ( e ) => setPickupLocation( e.target.value ) }
                        >
                            <option disabled={ true } value="Pickup Location">Pickup Location</option>
                            {
                                cityList.map( ( city, index ) => (
                                    <option key={ index } value={ city }>{ city }</option>
                                ) )
                            }
                        </select>
                        <p className="px-1 text-sm text-gray-500"> {
                            pickupLocation ? ` ${ pickupLocation }` : "Please select a location"
                        }</p>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="pickup-date">Pick-up Date</label>
                        <input type="date" name="pickup-date" id="pickup-date" min={ new Date().toISOString().split( 'T' )[ 0 ] } className="input input-ghost" required />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="return-date">Return Date</label>
                        <input type="date" name="return-date" id="return-date" min={ new Date().toISOString().split( 'T' )[ 0 ] } className="input input-ghost" required />
                    </div>

                </div>
                <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white  rounded-full cursor-pointer">
                    <img src={ assets.search_icon } alt="search" className="brightness-300" />
                    Search</button>
            </form>

            <img src={ assets.main_car } alt="car" className="max-h-74" />

        </div>
    )
}
