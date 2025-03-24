import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">IPL Ticket Booking</h1>
            <div>
                <Link to="/matches" className="mx-2">Matches</Link>
                <Link to="/history" className="mx-2">Bookings</Link>
                <Link to="/admin" className="mx-2">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
