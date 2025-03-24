import React, { useState } from "react";
import { bookTicket } from "../api/apiservice"; // ✅ Import API function
import './styles/matchstyle.css'

const MatchCard = ({ match }) => {
    const [loading, setLoading] = useState(false);
    const [ticketCount, setTicketCount] = useState(1); // ✅ Default to 1 ticket

    const handleBooking = async () => {
        setLoading(true);
        try {
            console.log(`Booking ${ticketCount} tickets for Match ID:`, match.id);
            await bookTicket(match.id, ticketCount);
            alert(`Successfully booked ${ticketCount} tickets!`);
        } catch (error) {
            console.error("Booking failed:", error.response?.data || error.message);
            alert("Booking failed! " + (error.response?.data?.message || ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold">{match?.team1} vs {match?.team2}</h2>
            <p><strong>Date:</strong> {new Date(match?.scheduledDate).toLocaleString()}</p>
            <p><strong>Venue:</strong> {match?.venue}</p>
            <p><strong>Tickets Available:</strong> {match?.availableTickets}</p>

            {/* Ticket Counter */}
            <div className="flex items-center mt-2">
                <button 
                    onClick={() => setTicketCount(prev => Math.max(1, prev - 1))} 
                    className="px-2 py-1 bg-red-500 text-white rounded-md disabled:bg-gray-300"
                    disabled={ticketCount <= 1}
                >
                    -
                </button>
                <span className="px-4">{ticketCount}</span>
                <button 
                    onClick={() => setTicketCount(prev => Math.min(match.availableTickets, prev + 1))} 
                    className="px-2 py-1 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    disabled={ticketCount >= match.availableTickets}
                >
                    +
                </button>
            </div>

            <button
                onClick={handleBooking}
                className={`mt-2 px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                disabled={loading}
            >
                {loading ? "Booking..." : `Book ${ticketCount} Ticket(s)`}
            </button>
        </div>
    );
};

export default MatchCard;
