import { useState } from "react"
import Title from "../../components/owner/Title"
import { assets } from "../../assets/assets"



export default function AddCar ()
{


    const [ image, setImage ] = useState<File | null>( null )
    const [ car, setCar ] = useState( {
        brand: '',
        model: '',
        year: 0,
        pricePerDay: 0,
        category: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: 0,
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
        setLoading( true )
        setTimeout( () =>
        {
            setLoading( false )
        }, 4000 )

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
                            onChange={ e => setCar( { ...car, year: Number( e.target.value ) } ) }
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label >Daily Price ({ currency })</label>
                        <input type="number"
                            value={ car.pricePerDay }
                            placeholder='100' className="border border-borderColor  px-3 py-2 mt-1 rounded-md outline-none" required
                            onChange={ e => setCar( { ...car, pricePerDay: Number( e.target.value ) } ) }
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
                            <option value="Semi-Automatic">Semi-Automatic</option>
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
                            onChange={ e => setCar( { ...car, seating_capacity: Number( e.target.value ) } ) }
                        />
                    </div>

                </div>
                {/* location */ }
                <div className="flex flex-col w-full">
                    <label >Location</label>
                    <select onChange={ e => setCar( { ...car, location: e.target.value } ) } value={ car.location } className="select">
                        <option value="">Select Location</option>

                        <option value="Albuquerque">Albuquerque</option>
                        <option value="Atlanta">Atlanta</option>
                        <option value="Austin">Austin</option>
                        <option value="Baltimore">Baltimore</option>
                        <option value="Boston">Boston</option>
                        <option value="Charlotte">Charlotte</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Cleveland">Cleveland</option>
                        <option value="Colorado Springs">Colorado Springs</option>
                        <option value="Columbus">Columbus</option>
                        <option value="Dallas">Dallas</option>
                        <option value="Denver">Denver</option>
                        <option value="Detroit">Detroit</option>
                        <option value="El Paso">El Paso</option>
                        <option value="Fort Worth">Fort Worth</option>
                        <option value="Fresno">Fresno</option>
                        <option value="Houston">Houston</option>
                        <option value="Indianapolis">Indianapolis</option>
                        <option value="Jacksonville">Jacksonville</option>
                        <option value="Kansas City">Kansas City</option>
                        <option value="Las Vegas">Las Vegas</option>
                        <option value="Long Beach">Long Beach</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Memphis">Memphis</option>
                        <option value="Miami">Miami</option>
                        <option value="Milwaukee">Milwaukee</option>
                        <option value="Minneapolis">Minneapolis</option>
                        <option value="Nashville">Nashville</option>
                        <option value="New Orleans">New Orleans</option>
                        <option value="New York">New York</option>
                        <option value="Oakland">Oakland</option>
                        <option value="Oklahoma City">Oklahoma City</option>
                        <option value="Omaha">Omaha</option>
                        <option value="Orlando">Orlando</option>
                        <option value="Philadelphia">Philadelphia</option>
                        <option value="Phoenix">Phoenix</option>
                        <option value="Pittsburgh">Pittsburgh</option>
                        <option value="Portland">Portland</option>
                        <option value="Sacramento">Sacramento</option>
                        <option value="San Antonio">San Antonio</option>
                        <option value="San Diego">San Diego</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="San Jose">San Jose</option>
                        <option value="Seattle">Seattle</option>
                        <option value="Tampa">Tampa</option>
                        <option value="Tucson">Tucson</option>
                        <option value="Tulsa">Tulsa</option>
                        <option value="Virginia Beach">Virginia Beach</option>
                        <option value="Washington D.C.">Washington D.C.</option>
                        <option value="Wichita">Wichita</option>
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
