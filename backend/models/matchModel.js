// models/matchModel.js - Match Model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Match = sequelize.define('Match', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    team1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team2: {
        type: DataTypes.DATE,
        allowNull: false
    },
    scheduledDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableTickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    venue: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Match;
