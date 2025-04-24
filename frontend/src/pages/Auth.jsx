import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiservice"; // ✅ Import from apiService.js
import AuthContext from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/button";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loading state
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            console.log("Attempting login for:", email); // ✅ Debugging log
            const response = await loginUser(email, password);

            console.log("Login successful, token received:", response.data.token);
            localStorage.setItem("token", response.data.token); // ✅ Store token
            localStorage.setItem("user", JSON.stringify(response.data.user));

            login(response.data.user); // ✅ Update Auth Context

            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button text={loading ? "Logging in..." : "Login"} onClick={handleLogin} className="mt-4" disabled={loading} />
        </div>
    );
};

export default Auth;
