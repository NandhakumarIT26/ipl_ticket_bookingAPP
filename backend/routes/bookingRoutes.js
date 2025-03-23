// routes/bookingRoutes.js - Booking Routes
const express = require('express');
const { authenticateUser } = require('../middleware/authmiddleware');
const { bookTicket, getUserBookings, cancelBooking } = require('../controllers/bookingController');

const router = express.Router();

// Book a Ticket
router.post('/book', authenticateUser, bookTicket);

// Get User's Booking History
router.get('/history', authenticateUser, getUserBookings);

// Cancel an Active Booking
router.delete('/cancel/:bookingId', authenticateUser, cancelBooking);

module.exports = router;
