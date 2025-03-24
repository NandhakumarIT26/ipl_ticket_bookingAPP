import React, { useState, useEffect } from "react";
import { fetchMatches, bookTicket } from "../api/apiservice";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const response = await fetchMatches();
                setMatches(response.data);
            } catch (error) {
                console.error("Error fetching matches:", error.response?.data || error.message);
            }
        };
        loadMatches();
    }, []);

    const handleBooking = async (matchId) => {
        try {
            console.log("Booking Match ID:", matchId);
            await bookTicket(matchId, 1);
            alert("Booking successful!");
        } catch (error) {
            alert("Booking failed!");
        }
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold my-4 text-center">Upcoming Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match} onBook={handleBooking} />
                ))}
            </div>
        </div>
    );
};

export default UserDashboard;
