


// Function to get auth token from localStorage
import api from "./axios";

// Function to get auth token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// 🟢 Fetch Matches (Public)
export const fetchMatches = async () => {
    return await api.get("/matches");
};

// 🟢 Update Match (Admin - Requires Token)
export const updateMatch = async (matchId, matchData) => {
    return await api.put(`/matches/update/${matchId}`, matchData, getAuthHeaders());
};

// 🟢 Delete Match (Admin - Requires Token)
export const deleteMatch = async (matchId) => {
    return await api.delete(`/matches/delete/${matchId}`, getAuthHeaders());
};



export const loginUser = async (email, password) => {
    return await api.post("/auth/login", { email, password });
};

export const registerUser = async (name, email, password, role) => {
    return await api.post("/auth/register", { name, email, password, role });
};

// 🟢 Matches (User & Admin)
export const createMatch = async (matchData) => {
    return await api.post("/matches/create", matchData);
};




// 🟢 Ticket Booking (User)
export const bookTicket = async (matchId, numberOfTickets) => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    return await api.post(
        "/bookings/book",
        { matchId, numberOfTickets },
        {
            headers: {
                Authorization: `Bearer ${token}`, // ✅ Include auth token
            },
        }
    );
};

export const getUserBookings = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    return await api.get("/bookings/history", {
        headers: {
            Authorization: `Bearer ${token}`, // ✅ Include auth token
        },
    });
};

export const cancelBooking = async (bookingId) => {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    return await api.delete(`/bookings/cancel/${bookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // ✅ Include auth token
        },
    });
};