
type AddCar = {
    brand: string;
    model: string;
    year: string;
    category: string;
    seating_capacity: string;
    fuelType: string;
    transmission: string;
    pricePerDay: string;
    location: string;
    description: string;
    carImage:FormData
}

type CarStatus = {
    isAvailable:boolean
}



export type { AddCar, CarStatus }