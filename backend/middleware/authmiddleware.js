// middleware/authMiddleware.js - Authentication Middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
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
