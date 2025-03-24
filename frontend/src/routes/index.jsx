import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import UserDashboard from "../pages/UserDashboard";
import BookingHistory from "../pages/BookingHistory";
import Matches from "../pages/Matches";
import Admin from "../pages/Admin";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
