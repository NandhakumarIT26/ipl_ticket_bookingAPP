// controllers/authController.js - Authentication Controller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received login request for email:", email);

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("User not found!");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log("User found:", user.email);

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password!");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log("Password matched!");

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }  // Default to 7 days if missing
        );

        console.log("User logged in successfully");

        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};


module.exports = { registerUser, loginUser };