// controllers/matchController.js - Match Controller
const Match = require('../models/matchModel');

// Get all matches
const getMatches = async (req, res) => {
    try {
        const matches = await Match.findAll();
        console.log(matches);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching matches', error });
    }
};

// Create a new match (Admin only)
const createMatch = async (req, res) => {
    try {
        const { team1, team2, scheduledDate, availableTickets, venue } = req.body;
        const match = await Match.create({ team1, team2, scheduledDate, availableTickets, venue });
        res.status(201).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error creating match', error });
    }
};

// Update match details (Admin only)
const updateMatch = async (req, res) => {
    try {
        const { matchId } = req.params;
        const updatedMatch = await Match.update(req.body, { where: { id: matchId } });
        res.status(200).json({ message: 'Match updated successfully', updatedMatch });
    } catch (error) {
        res.status(500).json({ message: 'Error updating match', error });
    }
};

// Delete a match (Admin only)
const deleteMatch = async (req, res) => {
    try {
        const { matchId } = req.params;
        await Match.destroy({ where: { id: matchId } });
        res.status(200).json({ message: 'Match deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting match', error });
    }
};

module.exports = { getMatches, createMatch, updateMatch, deleteMatch };
