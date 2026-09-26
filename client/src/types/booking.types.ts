import type { Car } from "../assets/assets";

export type BookingStatus = "confirmed" | "pending" |"canceled";

export interface Booking
{
    _id: string;
    car: Car;
    user: string;
    owner: string;
    pickupDate: string;
    returnDate: string;
    status: BookingStatus;
    price: number;
    createdAt: string;
}

export interface DashboardData
{
    totalCars: number;
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    recentBookings: Booking[];
    monthlyRevenue: number;
}