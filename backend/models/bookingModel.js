// models/bookingModel.js - Booking Model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const User = require('./userModel');
const Match = require('./matchModel');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    matchId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Match,
            key: 'id'
        }
    },
    numberOfTickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});

User.hasMany(Booking, { foreignKey: 'userId' });
Match.hasMany(Booking, { foreignKey: 'matchId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Match, { foreignKey: 'matchId' });

module.exports = Booking;
