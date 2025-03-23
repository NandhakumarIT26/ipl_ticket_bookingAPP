// routes/matchRoutes.js - Match Routes
const express = require('express');
const { authenticateUser, authenticateAdmin } = require('../middleware/authmiddleware');
const { createMatch, getMatches, updateMatch, deleteMatch } = require('../controllers/matchController');

const router = express.Router();

// Get all matches (Public route)
router.get('/', getMatches);

// Create a new match (Admin only)
router.post('/create', authenticateAdmin, createMatch);

// Update match details (Admin only)
router.put('/update/:matchId', authenticateAdmin, updateMatch);

// Delete an active match (Admin only)
router.delete('/delete/:matchId', authenticateAdmin, deleteMatch);

module.exports = router;
