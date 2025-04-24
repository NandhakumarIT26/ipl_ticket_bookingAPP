import React, { useState, useEffect } from "react";
import api from "../api/axios";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";


const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await api.get("/matches");
            setMatches(response.data);
        };
        fetchMatches();
    }, []);

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold my-4 text-center">Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((match) => (
                    <MatchCard match={match} />//key={match.id} 
                ))}
            </div>
        </div>
    );
};

export default Matches;
