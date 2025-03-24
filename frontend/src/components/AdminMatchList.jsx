import React from "react";

const AdminMatchList = ({ matches, onEdit, onDelete }) => {
    return (
        <div>
            {matches.length === 0 ? <p>No matches found.</p> : matches.map((match) => (
                <div key={match.id} className="border p-4 rounded-md shadow-md my-2">
                    <h3 className="text-lg font-bold">{match.team1} vs {match.team2}</h3>
                    <p><strong>Date:</strong> {new Date(match.scheduledDate).toLocaleString()}</p>
                    <p><strong>Tickets Available:</strong> {match.availableTickets}</p>
                    <button 
                        onClick={() => onEdit(match.id)} 
                        className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => onDelete(match.id)} 
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdminMatchList;
