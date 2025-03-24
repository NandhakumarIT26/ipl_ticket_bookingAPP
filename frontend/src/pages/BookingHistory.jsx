import React, { useState, useEffect } from "react";
import { getUserBookings, cancelBooking } from "../api/apiservice"; // ✅ Import from apiService.js
import BookingList from "../components/BookingList";
import Navbar from "../components/Navbar";



const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getUserBookings();
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching booking history:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold my-4 text-center">Booking History</h1>

            {loading ? (
                <p className="text-center">Loading booking history...</p>
            ) : (
                <BookingList bookings={bookings} setBookings={setBookings} />
            )}
        </div>
    );
};

export default BookingHistory;
