// controllers/bookingController.js - Booking Controller
const Booking = require('../models/bookingModel');
const Match = require('../models/matchModel');

// Book a ticket
const bookTicket = async (req, res) => {
    try {
        const { matchId, numberOfTickets } = req.body;
        const userId = req.user.id;

        // Check if match exists and has enough tickets
        const match = await Match.findByPk(matchId);
        if (!match) return res.status(404).json({ message: 'Match not found' });
        if (match.availableTickets < numberOfTickets) return res.status(400).json({ message: 'Not enough tickets available' });

        // Deduct tickets and create booking
        match.availableTickets -= numberOfTickets;
        await match.save();

        const booking = await Booking.create({ userId, matchId, numberOfTickets });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket', error });
    }
};

// Get user's booking history
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.findAll({ where: { userId }, include: Match });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking history', error });
    }
};

// Cancel an active booking
const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user.id;

        const booking = await Booking.findOne({ where: { id: bookingId, userId } });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        // Refund tickets to match
        const match = await Match.findByPk(booking.matchId);
        match.availableTickets += booking.numberOfTickets;
        await match.save();

        await booking.destroy();
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling booking', error });
    }
};

module.exports = { bookTicket, getUserBookings, cancelBooking };