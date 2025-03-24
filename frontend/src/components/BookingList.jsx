import React, { useState } from "react";
import { cancelBooking } from "../api/apiservice"; // ✅ Import API function

const BookingList = ({ bookings, setBookings }) => {
    const [loadingId, setLoadingId] = useState(null); // ✅ Track which booking is being canceled

    const handleCancel = async (bookingId) => {
        setLoadingId(bookingId); // ✅ Disable button while canceling
        try {
            console.log("Canceling Booking ID:", bookingId);
            await cancelBooking(bookingId);
            alert("Booking canceled successfully!");

            // ✅ Remove canceled booking from state
            setBookings(bookings.filter((b) => b.id !== bookingId));
        } catch (error) {
            console.error("Cancellation failed:", error.response?.data || error.message);
            alert("Cancellation failed! " + (error.response?.data?.message || ""));
        } finally {
            setLoadingId(null); // ✅ Re-enable button
        }
    };

    return (
        <div>
            {bookings.length === 0 ? (
                <p className="text-center">No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking.id} className="border p-4 rounded-md shadow-md my-2">
                        <h3 className="text-lg font-bold">{booking.Match?.team1} vs {booking.Match?.team2}</h3>
                        <p><strong>Date:</strong> {new Date(booking.Match?.scheduledDate).toLocaleString()}</p>
                        <p><strong>Tickets:</strong> {booking.numberOfTickets}</p>
                        <button 
                            onClick={() => handleCancel(booking.id)} 
                            className={`mt-2 px-4 py-2 rounded-md text-white ${loadingId === booking.id ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
                            disabled={loadingId === booking.id} // ✅ Disable while canceling
                        >
                            {loadingId === booking.id ? "Canceling..." : "Cancel Booking"}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookingList;
