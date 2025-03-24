import React, { useState, useEffect } from "react";
import { fetchMatches, updateMatch, deleteMatch } from "../api/apiservice";
import AdminMatchList from "../components/AdminMatchList";
import Navbar from "../components/Navbar";

const Admin = () => {
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

    const handleEdit = async (matchId) => {
        const newTickets = prompt("Enter new ticket count:");
        if (newTickets) {
            await updateMatch(matchId, { availableTickets: newTickets });
            alert("Match updated!");
            setMatches(matches.map((m) => (m.id === matchId ? { ...m, availableTickets: newTickets } : m)));
        }
    };

    const handleDelete = async (matchId) => {
        await deleteMatch(matchId);
        alert("Match deleted!");
        setMatches(matches.filter((m) => m.id !== matchId));
    };

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold my-4 text-center">Admin Panel</h1>
            <AdminMatchList matches={matches} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Admin;
