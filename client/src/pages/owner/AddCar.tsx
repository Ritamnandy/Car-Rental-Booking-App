import { useState } from "react"
import Title from "../../components/owner/Title"
import { assets } from "../../assets/assets"
import toast from "react-hot-toast"
import { carApiClass } from "../../api/car/ApiClass"

const LocationData = [
    "Albuquerque",
    "Atlanta",
    "Austin",
    "Baltimore",
    "Boston",
    "Charlotte",
    "Chicago",
    "Cleveland",
    "Colorado_Springs",
    "Columbus",
    "Dallas",
    "Denver",
    "Detroit",
    "El_Paso",
    "Fort_Worth",
    "Fresno",
    "Houston",
    "Indianapolis",
    "Jacksonville",
    "Kansas_City",
    "Las_Vegas",
    "Long_Beach",
    "Los_Angeles",
    "Memphis",
    "Miami",
    "Milwaukee",
    "Minneapolis",
    "Nashville",
    "New_Orleans",
    "New_York",
    "Oakland",
    "Oklahoma_City",
    "Omaha",
    "Orlando",
    "Philadelphia",
    "Phoenix",
    "Pittsburgh",
    "Portland",
    "Sacramento",
    "San_Antonio",
    "San_Diego",
    "San_Francisco",
    "San_Jose",
    "Seattle",
    "Tampa",
    "Tucson",
    "Tulsa",
    "Virginia_Beach",
    "Washington_DC",
    "Wichita",
];

export default function AddCar ()
{


    const [ image, setImage ] = useState<File | null>( null )
    const [ car, setCar ] = useState( {
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: '',
        location: '',
        description: '',
    } )

    const [ loading, setLoading ] = useState( false )

    const currency = import.meta.env.VITE_CURRENCY as string

    // console.log( image?.name  );
    // console.log( image?.size  );


    const onSubmitHandler = async ( e: React.SubmitEvent ) =>
    {
        e.preventDefault()
        if ( !image )
        {
            toast.error( 'Please upload a car image' )
            return
        }
        const formData = new FormData();
        formData.append( 'carImage', image );
        console.log( 'car data:- ', {
            brand: car.brand,
            model: car.model,
            carImage: formData,
            category: car.category,
            description: car.description,
            fuelType: car.fuel_type,
            year: car.year,
            seating_capacity: car.seating_capacity,
            transmission: car.transmission.replace( '-', '' ),
            pricePerDay: car.pricePerDay,
            location: car.location,
        } );

        setLoading( true )
        try
        {
            formData.append( "brand", car.brand );
            formData.append( "model", car.model );
            formData.append( "year", car.year );
            formData.append( "pricePerDay", car.pricePerDay );
            formData.append( "category", car.category );
            formData.append( "transmission", car.transmission );
            formData.append( "fuelType", car.fuel_type );
            formData.append(
                "seating_capacity",
                String( car.seating_capacity ),
            );
            formData.append( "location", car.location );
            formData.append( "description", car.description );

            const response = await carApiClass.addCar( formData )

            console.log( "add car  response:", response?.data?.success );

            if ( response?.data?.success )
            {
                toast.success( 'Car added successfully' )
                setLoading( false )
                setCar( {
                    brand: '',
                    model: '',
                    year: '',
                    pricePerDay: '',
                    category: '',
                    transmission: '',
                    fuel_type: '',
                    seating_capacity: '',
                    location: '',
                    description: '',
                } )
                setImage( null )
            }
        } catch ( error )
        {
            console.error( error )
            toast.error( 'Failed to add car' )
        } finally
        {
            setLoading( false )
        }

    }


    return (
        <div className="px-4 py-10 md:px-10 flex-1 relative">
            { loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) }
            <Title title="Add New Car" subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications." />
            <form onSubmit={ onSubmitHandler } className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">

                {/* car image */ }
                <div className="flex items-center gap-2 w-full">
                    <label htmlFor="carImage">
                        <img src={ image ? URL.createObjectURL( image ) : assets.upload_icon } alt="default" className="h-14 rounded cursor-pointer" />
                        <input type="file" id="carImage" accept="image/*" hidden onChange={ ( e ) => setImage( e.target.files?.[ 0 ] || null ) } />
                    </label>
                    <p className="text-sm text-gray-500">Upload a picture of your car</p>
                </div>

                {/* car brand & model */ }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col w-full">
                        <label >Brand</label>
                        <input type="text"
                            value={ car.brand }
                            placeholder="e.g. BMW, Mercedes, Audi..." className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, brand: e.target.value } ) }
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label>Model</label>
                        <input type="text"
                            value={ car.model }
                            placeholder="e.g. X5, E-Class, M4..." className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, model: e.target.value } ) }
                        />
                    </div>
                </div>
                {/* car year, daliy price & category  */ }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label >Year</label>
                        <input type="number"
                            value={ car.year }
                            placeholder={ `${ new Date().getFullYear() }` } className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, year: e.target.value } ) }
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label >Daily Price ({ currency })</label>
                        <input type="number"
                            value={ car.pricePerDay }
                            placeholder='100' className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, pricePerDay: e.target.value } ) }
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label >Category</label>
                        <select onChange={ e => setCar( { ...car, category: e.target.value } ) } value={ car.category } className="select">
                            <option value="">Select category</option>

                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Sports">Sports</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Supercar">Supercar</option>
                            <option value="MUV">MUV</option>
                            <option value="MPV">MPV</option>
                            <option value="Van">Van</option>
                            <option value="Pickup Truck">Pickup Truck</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Off-Road">Off-Road</option>
                        </select>
                    </div>
                </div>
                {/* Transmission ,Fuel Type ,Seating Capacity */ }
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex flex-col w-full">
                        <label >Transmission</label>
                        <select onChange={ e => setCar( { ...car, transmission: e.target.value } ) } value={ car.transmission } className="select">
                            <option value="">Select transmission</option>

                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                            <option value="SemiAutomatic">Semi-Automatic</option>
                            <option value="AMT">AMT</option>
                            <option value="CVT">CVT</option>
                            <option value="DCT">DCT</option>
                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label >Fuel Type</label>
                        <select onChange={ e => setCar( { ...car, fuel_type: e.target.value } ) } value={ car.fuel_type } className="select">
                            <option value="">Select fuel type</option>

                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="CNG">CNG</option>
                            <option value="LPG">LPG</option>
                            <option value="Hydrogen">Hydrogen</option>

                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label >Seating Capacity</label>
                        <input type="number"
                            value={ car.seating_capacity }
                            placeholder='5' className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, seating_capacity: e.target.value } ) }
                        />
                    </div>

                </div>
                {/* location */ }
                <div className="flex flex-col w-full">
                    <label >Location</label>
                    <select onChange={ e => setCar( { ...car, location: e.target.value } ) } value={ car.location } className="select">
                        <option value="">Select Location</option>

                        {
                            LocationData.map( ( data, index ) =>
                            {
                                return <option key={ index } value={ data }>{ data.replace( '_', ' ' ) }</option>
                            } )
                        }
                    </select>
                </div>
                {/* description */ }
                <div className="flex flex-col w-full">
                    <label >Description</label>
                    <textarea rows={ 5 }
                        value={ car.description }
                        placeholder="Describe your car, its condition, and any notable details..." className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                        onChange={ e => setCar( { ...car, description: e.target.value } ) }
                    />
                </div>
                <button type="submit" className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md w-max cursor-pointer">
                    <img src={ assets.tick_icon } alt="tick" />
                    List Your Car
                </button>
            </form>



        </div>
    )
}
