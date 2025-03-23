// server.js - Entry point for Express.js backend

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/dbConfig');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const matchRoutes = require('./routes/matchRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/bookings', bookingRoutes);

// Sync DB and Start Server
sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log('DB Sync Error:', err));



