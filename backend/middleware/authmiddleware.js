// middleware/authMiddleware.js - Authentication Middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();



const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
// Middleware to verify Admin role
const authenticateAdmin = (req, res, next) => {
    authenticateUser(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied: Admins Only' });
        }
    });
};

module.exports = { authenticateUser, authenticateAdmin };
